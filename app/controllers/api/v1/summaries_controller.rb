module Api
  module V1
    class SummariesController < ApiController
      def create
        chat = Chat.find_by!(token: params[:chat_token])

        unless chat.has_user_messages?
          return render json: { error: :no_user_messages }, status: :unprocessable_entity
        end

        render json: CreateSummary.call(chat: chat).summary
      end

      def send_email
        result = SendSummaryEmail.call(
          chat_token: params[:chat_token],
          summary_token: params[:summary_token],
          email: params[:email]
        )

        if result.error.present?
          return render json: { error: result.error }, status: :unprocessable_entity
        end

        render json: result.summary
      end
    end
  end
end
