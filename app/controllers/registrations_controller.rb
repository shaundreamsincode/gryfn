class RegistrationsController < ApplicationController
  def create
    result = PerformRegistration.call(
      name: params[:name],
      birth_year: params[:birth_year],
      email: params[:email],
      country: params[:country],
      zip_code: params[:zip_code],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )

    render json: { accountToken: result.account.token }
  end
end
