module Api
  class SessionsController < ApiController
    def create
      account = Account.find_by(email: params[:email])
      return render json: { error: 'Invalid email or password' }, status: :unauthorized if account.nil?

      if account.authenticate(params[:password])
        token = account.generate_jwt
        render json: token
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  end
end
