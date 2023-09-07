class Api::IntakeAssessmentsController < ApplicationController
  def show
    byebug
    intake_assessment = IntakeAssessment.find_by_token!(params[:token])
    render json: intake_assessment.hashify
  end
end
