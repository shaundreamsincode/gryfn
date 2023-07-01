module Api
  module V1
    class ChatsController < ApplicationController
      def index
        chats = Chat.all
        render json: chats
      end
    end
  end
end
