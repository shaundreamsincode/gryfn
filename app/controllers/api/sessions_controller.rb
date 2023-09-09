module Api
  class SessionsController < ApiController
    skip_before_action :authenticate_current_account!, only: :create

    def create
      account = Account.find_by(email: params[:email])
      return render json: { error: 'Invalid email or password' }, status: :unauthorized if account.nil?

      if account.authenticate(params[:password])
        token = account.generate_jwt
        render json: { token: token }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  end
end
