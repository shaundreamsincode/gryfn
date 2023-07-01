module Api
  module V1
    class MessagesController < ApiController
      def create
        create_message_result = CreateMessage.call(
          chat_token: params[:chat_token],
          message_content: message_params[:content]
        )

        render json: {
          user_message: create_message_result.user_message,
          assistant_message: create_message_result.assistant_message
        }
      end

      private def message_params
        params.require(:message).permit(:content)
      end
    end
  end
end
