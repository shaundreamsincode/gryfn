module Api
  class CurrentAccountController < ApplicationController
    before_action do
      token = request.headers['Authorization']&.split&.last
      @account = Account.from_jwt_token(token)
    end

    def index
      return render head: 404 if @account.blank?

      render json: @account.hashify
    end

    def update_basic_info
      return render head: 404 if @account.blank?

      basic_info_params = params.permit(:first_name, :last_name, :email)
    end

    def update_password
      return render head: 404 if @account.blank?

      unless @account.authenticate(password_params[:current_password])
        return render json: { error: 'Current password is incorrect.' }, status: :unprocessable_entity
      end

      if password_params[:password] != password_params[:password_confirmation]
        return render json: { error: 'Password confirmation does not match password.' }, status: :unprocessable_entity
      end

      if password_params[:password].length < 8 || password_params[:password_confirmation].length < 8
        return render json: { error: 'Password must be at least 8 characters long.' }, status: :unprocessable_entity
      end

      @account.update!(
        password: password_params[:password],
        password_confirmation:
          password_params[:password_confirmation]
      )

      render json: {}, status: :ok
    end

    private def account_params
      params.permit(:email, :password, :password_confirmation).to_h
    end

    private def password_params
      params.permit(:password, :password_confirmation, :current_password)
    end
  end
end
