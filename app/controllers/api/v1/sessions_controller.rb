module Api
  module V1
    class SessionsController < ApiController
      def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          token = user.generate_jwt
          render json: { token: token }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def verify_token
        puts "verifying..."
        token = request.headers['Authorization']&.split&.last
        if token
          begin
            JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256')
            # Additional validation checks if necessary

            render json: { valid: true }, status: :ok
          rescue JWT::DecodeError, JWT::ExpiredSignature
            render json: { valid: false }, status: :unauthorized
          end
        else
          render json: { valid: false }, status: :unauthorized
        end
      end
    end
  end
end
