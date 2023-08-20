class RegistrationsController < ApplicationController
  def create
    result = PerformRegistration.call(
      patient_first_name: params[:patient_first_name],
      birth_year: params[:birth_year],
      email: params[:email],
      country: params[:country],
      zip_code: params[:zip_code],
    )

    render json: { intakeAssessmentToken: result.intake_assessment.token }
  end
end
