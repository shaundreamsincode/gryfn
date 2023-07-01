class ProcessSlashCommand
  include Interactor

  def call
    validate_parameters!

    action_type = context.text.split(' ').first
    # byebug

    if action_type == 'declare'
      context.incident = create_incident!
    elsif action_type == 'resolve'
      context.incident = ResolveIncident.call(incident_channel_name: context.channel_name).incident
    elsif action_type.blank?
      raise SlashCommandError, 'action type not provided'
    else
      raise SlashCommandError, 'invalid action type'
    end

    context.incident
  end

  private

  def create_incident!
    # "declare (title) [description] <severity>"
    regex = /^\(.*\)( \[.*\])?( \<.*\>)?$/
    parameter_text = context.text.split('declare ').last

    unless parameter_text.match?(regex)
      raise SlashCommandError, 'invalid command structure'
    end

    title = parameter_text.match(/(\(.*\))/).to_s.gsub(/[()]/, '')

    if title.blank?
      raise SlashCommandError, 'title must be present'
    end

    description = parameter_text.match(/(\[.*\])/).to_s.gsub(/[\[\]]/, '')
    severity = parameter_text.match(/(\<.*\>)/).to_s.gsub(/[<>]/, '')

    valid_severities = %w(sev0 sev1 sev2)

    if severity.present? && !valid_severities.include?(severity)
      # todo - also add model constraints...
      raise SlashCommandError, 'invalid severity - must be either sev0, sev1, or sev2'
    end

    CreateIncident.call(
      title: title,
      description: description,
      severity: severity,
      channel_name: context.channel_name,
      creator_name: context.user_name
    ).incident
  end

  def validate_parameters!
    unless context.command == '/rootly'
      raise SlashCommandError, 'Invalid command: command must be /rootly'
    end

    if context.channel_name == 'directmessage'
      raise SlashCommandError, 'Command must be run in a channel, not in a direct message (DM)'
    end
  end
end
