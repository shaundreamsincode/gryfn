require 'rails_helper'

RSpec.describe Api::V1::SlashCommandsController, type: :request do
  subject { post '/api/v1/slash_commands', params: params }

  let(:params) do
    {
      token: 'abc123',
      team_id: 'def456',
      team_domain: 'test-workspace',
      channel_id: 'ghi789',
      user_name: 'user_name',
      is_enterprise_install: false,
      response_url: 'https://hooks.slack.com/commands/vut654/',
      trigger_id: 'srq987',
      user_id: user_id,
      command: command,
      channel_name: channel_name,
      text: text
    }
  end

  let(:command) { '/rootly' }
  let(:channel_name) { 'doggos' }
  let(:text) { "#{action_type} #{action_params}" }

  let(:action_type) { '' }
  let(:action_params) { '' }
  let(:user_id) { 'zyx321' }

  let(:endpoint_triggered_at) { Time.new(2023, 1, 1) }

  before { Timecop.freeze endpoint_triggered_at }
  after { Timecop.return }

  shared_examples_for :an_unsuccessful_request do |expected_error_message|
    it 'is not a successful request' do
      expect_any_instance_of(Slack::Web::Client).to receive(:chat_postEphemeral).with(
        text: expected_error_message,
        channel: channel_name,
        user: user_id
      )

      subject

      expect(response.status).to eq(422)
      expect(JSON.parse(response.body)).to eq({"error"=>expected_error_message})
    end

  end

  describe 'declaring an incident' do
    let(:action_type) { 'declare' }
    let(:action_params) { '(test title)' }

    before do
      allow_any_instance_of(Slack::Web::Client).to receive(:conversations_create)
    end

    it 'is a successful request' do
      subject

      expect(JSON.parse(response.body)).to eq("message"=>"Incident was declared in the channel incident-doggos-#{endpoint_triggered_at.to_i}")
      expect(response.status).to eq(200)
    end

    it 'creates a new incident' do
      expect { subject }.to change(Incident, :count).by(1)
      incident = Incident.last

      expect(incident).to have_attributes(
                            title: 'test title',
                            creator_name: 'user_name',
                            channel_name: 'doggos',
                            status: 'open',
                            incident_channel_name: "incident-doggos-#{endpoint_triggered_at.to_i}",
                            resolved_at: nil,
                          # description: nil, # todo fix this
                          # severity: nil, # todo fix this
                            )
    end

    it 'uses the Slack API to create a new channel' do
      expected_incident_channel_name = "incident-doggos-#{endpoint_triggered_at.to_i}"

      expect_any_instance_of(Slack::Web::Client).to receive(:conversations_create).with(
        name: expected_incident_channel_name,
        is_private: false
      )

      subject
    end

    context 'when a description is added' do
      let(:action_params) { '(test title) [test description]' }

      it 'adds a description to the incident' do
        expect { subject }.to change(Incident, :count).by(1)
        incident = Incident.last

        expect(incident.description).to eq('test description')
      end
    end

    context 'when a severity is added' do
      let(:action_params) { '(test title) <sev0>' }

      it 'adds a severity to the incident' do
        expect { subject }.to change(Incident, :count).by(1)
        incident = Incident.last

        expect(incident.severity).to eq('sev0')
      end
    end

    context 'when a description AND a severity is added' do
      let(:action_params) { '(test title) [test description] <sev0>' }

      it 'adds a description and a severity' do
        expect { subject }.to change(Incident, :count).by(1)
        incident = Incident.last

        expect(incident.description).to eq('test description')
        expect(incident.severity).to eq('sev0')
      end
    end

    # Unhappy paths

    context 'when a title is not provided' do
      let(:action_params) { '() [test description] <sev0>' }
      it_behaves_like :an_unsuccessful_request, 'title must be present'
    end

    context 'when the action text is invalid' do
      let(:action_params) { 'test title, test description, sev0' }

      it_behaves_like :an_unsuccessful_request, 'invalid command structure'
    end

    context 'when the severity is invalid' do
      let(:action_params) { '(test title) <invalid severity>' }

      it_behaves_like :an_unsuccessful_request, 'invalid severity - must be either sev0, sev1, or sev2'
    end

    context 'when the action is run in a private message' do
      let(:channel_name) { 'directmessage' }
      it_behaves_like :an_unsuccessful_request, 'Command must be run in a channel, not in a direct message (DM)'
    end
  end

  describe 'resolving an incident' do
    let(:channel_name) { 'incident-doggos-123' }
    let(:action_type) { 'resolve' }

    let!(:incident) do
      create(:incident, status: :open, incident_channel_name: channel_name)
    end

    before do
      allow_any_instance_of(Slack::Web::Client).to receive(:chat_postMessage)
    end

    it 'resolves the incident' do
      expect { subject }.to change { incident.reload.status }
                              .to('resolved').and change { incident.reload.resolved_at }.to(endpoint_triggered_at)
    end

    it 'uses the Slack API to mark the incident as resolved' do
      expect_any_instance_of(Slack::Web::Client).to receive(:chat_postMessage).with(
        channel: channel_name,
        text: "incident resolved at 2023-01-01 06:00:00 UTC"
      )

      subject
    end

    # Unhappy paths

    context 'when the action is run in a private message' do
      let(:channel_name) { 'directmessage' }
      it_behaves_like :an_unsuccessful_request, 'Command must be run in a channel, not in a direct message (DM)'
    end
  end

  # Unhappy paths

  context 'when the action type is missing' do
    let(:action_type) { '' }
    it_behaves_like :an_unsuccessful_request, 'action type not provided'
  end

  context 'when the action type is invalid' do
    let(:action_type) { '/lollerskates' }

    it_behaves_like :an_unsuccessful_request, 'invalid action type'
  end
end
