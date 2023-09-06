module Api
  class CurrentAccountController < ApplicationController
    def index
      token = request.headers['Authorization']&.split&.last
      account = Account.from_jwt_token(token)
      return render head: 404 if account.blank?

      render json: account.hashify
    end

    def update
      # todo - put into a hook
      token = request.headers['Authorization']&.split&.last
      account = Account.from_jwt_token(token)
      return render head: 404 if account.blank?

      params_to_update = account.hashify.merge(account_params)
      account.update(params_to_update)

      if account.update(params_to_update)
        render json: account
      else
        render json: account.errors.full_messages
      end
    end

    private def account_params
      params.permit(:email, :password, :password_confirmation).to_h
    end
  end
end
