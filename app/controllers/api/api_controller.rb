module Api
  class ApiController < ApplicationController
    # We skip checking for CSRF attacks because we are using JWT authentication.
    skip_before_action :verify_authenticity_token

    before_action :authenticate_current_account!

    protected def authenticate_current_account!
      token = request.headers['Authorization']&.split&.last
      @current_account = Account.from_jwt_token(token)

      # Check if authentication was successful, and raise an error if not
      unless @current_account
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
end
