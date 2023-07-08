require 'rails_helper'

RSpec.describe Api::V1::SummariesController, type: :request do
  describe '#create' do
    before do
      allow_any_instance_of(OpenAI::Client).to receive(:chat).and_return(
        { 'choices' => [{ 'message' =>  {'content' => 'stubbed_summary' } } ] }
      )
    end

    it 'creates a new summary' do
      chat = create(:chat)
      create(:message, chat: chat, role: :user, content: 'lollerskates')

      post "/api/v1/chats/#{chat.token}/summaries"

      expect(Summary.count).to eq(1)
      summary = Summary.last

      expect(summary.chat).to eq(chat)
      expect(summary.content).to eq('stubbed_summary')

      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to include(
                              'id' => summary.id,
                              'token' => summary.token,
                              'chat_id' => chat.id,
                              'content' => 'stubbed_summary'
                            )
    end

    # Unhappy paths

    context 'when the chat has no messages' do
      it 'is an unsuccessful request' do
        chat = create(:chat)
        post "/api/v1/chats/#{chat.token}/summaries"

        expect(Summary.count).to eq(0)
        expect(JSON.parse(response.body)).to eq({"error"=>"no_user_messages"})
      end
    end

    context 'when the chat token is invalid' do
      it 'raises an ActiveRecord::RecordNotFound error' do
        expect { post "/api/v1/chats/lollerskates/summaries" }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe '#send_email' do
    it 'sends an email with the summary' do
      chat = create(:chat)
      summary = create(:summary, chat: chat)
      email = 'spongebob@squarepants.com'

      expect(SummaryMailer).to receive(:summary_email).with(email, summary.content).and_call_original

      post "/api/v1/chats/#{chat.token}/summaries/#{summary.token}/send_email", params: { email: email }

      expect(ActionMailer::Base.deliveries.count).to eq(1)
      mail = ActionMailer::Base.deliveries.last

      expect(mail.to).to include(email)
      expect(mail.from).to include('docbot@docbot.tech')
      expect(mail.body).to include(summary.content)

      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to include(
                                             'id' => summary.id,
                                             'token' => summary.token,
                                             'chat_id' => chat.id,
                                             'content' => summary.content
                                           )
    end

    # Unhappy paths

    context 'when the email is an invalid format' do
      it 'is an invalid request' do
        chat = create(:chat)
        summary = create(:summary, chat: chat)
        email = 'lollerskates'

        post "/api/v1/chats/#{chat.token}/summaries/#{summary.token}/send_email", params: { email: email }

        expect(response.status).to eq(422)
        expect(JSON.parse(response.body)).to eq({"error"=>"invalid_email"})
      end
    end

    context 'when the chat token is invalid' do
      it 'raises an ActiveRecord::RecordNotFound error' do
        chat = create(:chat)
        summary = create(:summary, chat: chat)
        email = 'spongebob@squarepants.com'

        expect {
          post "/api/v1/chats/lollerskates/summaries/#{summary.token}/send_email", params: { email: email }
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when the summary token is invalid' do
      it 'raises an ActiveRecord::RecordNotFound error' do
        chat = create(:chat)
        email = 'spongebob@squarepants.com'

        expect {
          post "/api/v1/chats/#{chat.token}/summaries/lollerskates/send_email", params: { email: email }
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
