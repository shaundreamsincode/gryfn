class Api::IntakeAssessmentsController < ApplicationController
  def show
    intake_assessment = IntakeAssessment.find_by_token!(params[:token])

    render json: {
      token: intake_assessment.token,
      current_step: intake_assessment.current_step
    }
  end

  def move_to_next_step
    assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])

    updated_assessment = IntakeAssessments::MoveToNextStep.call(assessment: assessment).assessment
    render json: updated_assessment
  end

  def move_speech_assessment_to_next_level
    intake_assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])
    result = IntakeAssessments::MoveToNextSpeechAssessmentLevel.call(assessment: intake_assessment)

    if result.error.present?
      # e.g. not_in_speech_state
      return render json: { error: result.error }, status: :unprocessable_entity
    end

    render json: result.assessment
  end
end
