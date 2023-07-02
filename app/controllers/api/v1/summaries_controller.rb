module Api
  module V1
    class SummariesController < ApiController
      def create
        summary = GenerateChatSummary.call(
          chat_token: params[:chat_token]
        ).summary

        render json: summary
      end
    end
  end
end
