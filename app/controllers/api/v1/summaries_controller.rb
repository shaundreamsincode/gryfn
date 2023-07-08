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
        chat = Chat.find_by!(token: params[:chat_token])

        summary = Summary.find_by!(
          token: params[:summary_token],
          chat: chat
        )

        email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        unless email_regex.match?(params[:email])
          return render json: { error: :invalid_email }, status: :unprocessable_entity
        end

        SummaryMailer.summary_email(params[:email], summary.content).deliver_now

        render json: summary
      end
    end
  end
end
