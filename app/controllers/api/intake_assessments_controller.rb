class Api::IntakeAssessmentsController < Api::ApiController
  def show
    intake_assessment = IntakeAssessment.find_by_token!(params[:token])
    render json: intake_assessment.hashify
  end

  def cancel
    assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])
  end
end
