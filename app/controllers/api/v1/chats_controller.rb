module Api
  module V1
    class ChatsController < ApiController
      def index
        token = request.headers['Authorization']&.split&.last
        user_info = JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256').first
        user_id = user_info['id']

        chats = Chat.where(user_id: user_id)
        render json: chats
      end

      def create
        token = request.headers['Authorization']&.split&.last
        puts "token #{token}"

        user_info = JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256').first
        user_id = user_info['id']
        puts "user_id #{user_id}"

        chat = Chat.new(user_id: user_id)
        chat.save!
        render json: chat
      end
    end
  end
end
