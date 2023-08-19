class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token # TODO - fix

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

    render json: { assessment_token: result.account.token }
  end
end
