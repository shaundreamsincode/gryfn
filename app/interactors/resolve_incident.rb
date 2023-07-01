class ResolveIncident
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      incident = Incident.find_by(incident_channel_name: context.incident_channel_name)

      if incident.blank?
        SlashCommandError 'incident not found'
      end

      if incident.resolved?
        SlashCommandError 'incident already resolved'
      end

      incident.update!(
        status: :resolved,
        resolved_at: Time.zone.now
      )

      client = Slack::Web::Client.new(token: ENV['SLACK_API_TOKEN'])

      client.chat_postMessage(
        channel: context.incident_channel_name,
        text: "incident resolved at #{Time.zone.now}"
      )

      context.incident = incident
    end
  end
end