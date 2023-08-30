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

    if intake_assessment.speech_assessment_current_level.nil?
      return render json: { error: :not_in_speech_state }, status: :unprocessable_entity
    end

    current_level = intake_assessment.speech_assessment_current_level

    speech_questions_at_current_level = intake_assessment.speech_questions.where(level: current_level)

    if speech_questions_at_current_level.any? {|q| q.answer.blank? }
      return render json: { error: :unanswered_questions }, status: :unprocessable_entity
    end

    correct_words = speech_questions_at_current_level.select {|q| q.is_correct? }
    incorrect_problems = speech_questions_at_current_level.reject {|q| q.is_correct? }

    intake_assessment.speech_assessment_correct_words << correct_words
    intake_assessment.speech_assessment_correct_words.flatten!

    intake_assessment.speech_assessment_incorrect_words << incorrect_problems
    intake_assessment.speech_assessment_incorrect_words.flatten!

    if intake_assessment.speech_assessment_correct_words.length > 4 && intake_assessment.speech_assessment_incorrect_words.length > 4
      intake_assessment.update!(speech_assessment_current_level: nil)
      return render json: intake_assessment
    end

    intake_assessment.speech_assessment_current_level += 1
    intake_assessment.save!

    render json: intake_assessment
  end
end
