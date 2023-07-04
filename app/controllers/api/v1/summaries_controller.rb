module Api
  module V1
    class SummariesController < ApiController
      def create
        result = GenerateChatSummary.call(
          chat_token: params[:chat_token]
        )

        summary = result.summary
        summary_prompt = result.summary_prompt
        render json: {  summary: summary, summary_prompt: summary_prompt  }
      end
    end
  end
end
