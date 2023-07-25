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
        puts  "params #{params}"

        byebug

        result = SendSummaryEmail.call(
          chat_token: params[:chat_token],
          summary_token: params[:summary_token],
          name: params[:name],
          date_of_birth: params[:date_of_birth],
          doctor_email: params[:doctor_email],
          patient_email: params[:patient_email]
        )

        if result.error.present?
          return render json: { error: result.error }, status: :unprocessable_entity
        end

        render json: result.summary
      end
    end
  end
end
