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
        # todo - add BE validations to ensure that email is in correct format...
        summary = Summary.find_by!(token: params[:summary_token])
        SummaryMailer.summary_email(params[:email], summary.content).deliver_now

        render json: summary
      end
    end
  end
end
