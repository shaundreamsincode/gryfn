module Api
  module V1
    class ChatsController < ApiController
      def index
        chats = Chat.all
        render json: chats
      end
    end
  end
end
