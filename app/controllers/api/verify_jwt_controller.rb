module Api
  class VerifyJwtController < ApiController
    skip_before_action :authenticate_current_account!, only: :index

    def index
      token = request.headers['Authorization']&.split&.last

      if token.present? && token != "null"
        begin
          JWT.decode(token, ENV['SECRET_KEY_BASE'], true, algorithm: 'HS256')
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
# request.headers.to_h