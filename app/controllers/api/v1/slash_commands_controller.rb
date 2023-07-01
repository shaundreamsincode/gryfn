module Api
  module V1
    class SlashCommandsController < ApplicationController
      skip_before_action :verify_authenticity_token # todo - potentially remove this...?

      def create
        incident = ProcessSlashCommand.call(
          command: slash_command_params[:command],
          text: slash_command_params[:text],
          user_name: slash_command_params[:user_name],
          channel_name: slash_command_params[:channel_name]
        ).incident

        render json: { message: generate_response_message(incident) }, status: :ok
      rescue SlashCommandError, Slack::Web::Api::Errors::SlackError => e
        client = Slack::Web::Client.new(token: ENV['SLACK_API_TOKEN'])

        client.chat_postEphemeral(
          text: e.message,
          channel: slash_command_params[:channel_name],
          user: slash_command_params[:user_id]
        )

        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      def slash_command_params
        params.permit(:command, :text, :user_name, :user_id, :channel_name)
      end

      def generate_response_message(incident)
        if incident.status == 'open' # todo - fix enum
          return "Incident was declared in the channel #{incident.incident_channel_name}"
        end

        "Incident with the channel #{incident.incident_channel_name} was resolved"
      end
    end
  end
end

# <ActionController::Parameters {"token"=>"snmaz58bpOhdCxnW1oN6c2cS", "team_id"=>"T059YR2GY4W", "team_domain"=>"shauns-workspace-talk", "channel_id"=>"D05A2GRBRTP", "channel_name"=>"directmessage", "user_id"=>"U05A5BDUPM1", "user_name"=>"shauncarland", "command"=>"/rootly", "text"=>"test", "api_app_id"=>"A05A6AC321G", "is_enterprise_install"=>"false", "response_url"=>"https://hooks.slack.com/commands/T059YR2GY4W/5371096967168/t2FCYj4QevGre4tVWcllfdGz", "trigger_id"=>"5347400596594.5338852576166.0d50c99de4598cb2fc26916a587ef611", "controller"=>"slash_commands", "action"=>"create"} permitted: false>