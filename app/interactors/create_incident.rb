class CreateIncident
  include Interactor

  # CreateIncident.execute(
  #   title: title,
  #   description: description,
  #   severity: severity,
  #   channel_name: channel_name,
  #   creator_name: user_name
  # )

  def call
    ActiveRecord::Base.transaction do
      incident_channel_name = generate_incident_channel_name

      incident = Incident.create(
        title: context.title,
        description: context.description,
        severity: context.severity,
        channel_name: context.channel_name,
        incident_channel_name: incident_channel_name,
        creator_name: context.creator_name
      )

      client = Slack::Web::Client.new(token: ENV['SLACK_API_TOKEN'])
      client.conversations_create(name: incident_channel_name, is_private: false)

      context.incident = incident
    end
  end

  private

  def generate_incident_channel_name
    truncated_channel_name = context.channel_name[0..9]
    "incident-#{truncated_channel_name}-#{Time.now.to_i}"
  end
end