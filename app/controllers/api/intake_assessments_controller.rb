class Api::IntakeAssessmentsController < ApplicationController
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    render json: {
      token: intake_assessment.token,
      current_step: intake_assessment.current_step
    }
  end

  def move_to_next_step
    assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    # TODO - fix this

    if assessment.speech?
      assessment.eidetic!
    elsif assessment.eidetic?
      assessment.phonetic!
    elsif assessment.phonetic?
      assessment.summary!
    end

    render json: assessment

    # next_step = assessment.current_step.to_i + 1
    # assessment.update!(current_step: next_step)
    #
    # render json: assessment
  end
end
