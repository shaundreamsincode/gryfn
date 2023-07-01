module Api
  module V1
    class MessagesController < ApiController
      def create
        chat = Chat.find_by!(token: params[:chat_token])
        message = chat.messages.create!(message_params.merge(role: :user))

        render json: message
      end

      private def message_params
        params.require(:message).permit(:content)
      end
    end
  end
end
