module Api
  module V1
    class ChatsController < ApiController
      def show
        chat = Chat.find_by(token: params[:token])

        if chat.nil?
          render json: { error: "Chat not found" }, status: :not_found
        else
          render json: chat.to_json(include: [:messages])
        end
      end

      def create
        # token = request.headers['Authorization']&.split&.last
        # puts "token #{token}"
        #
        # user_info = JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256').first
        # user_id = user_info['id']
        # puts "user_id #{user_id}"
        #
        # chat = Chat.new(user_id: user_id)
        # chat.save!
        chat = Chat.create!
        render json: chat
      end
    end
  end
end
