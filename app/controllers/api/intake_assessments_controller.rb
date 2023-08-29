class Api::IntakeAssessmentsController < ActionController::Base
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    render json: {
      token: intake_assessment.token,
      current_step: intake_assessment.current_step,
      eidetic_questions: map_eidetic_questions(intake_assessment),
      speech_questions: []
    }
  end

  # /api/intake_questions/:intake_question_token/summary
  def summary
    assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])
    render json: assessment.to_json(include: [:intake_questions])
  end

  # /api/intake_assessments/:intake_assessment_token/send_summary_email
  def send_summary_email
    assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    SummaryMailer.summary_email(assessment).deliver_now
    head 200
  end


  def speech_questions
    intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    render json: intake_assessment.speech_questions.map do |question|
      # todo - do we want to hydrate up the correct answer?
      { token: question.token, answer: question.answer, correct_answer: question.correct_answer }
    end
  end

  def phonetic_questions
    intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    # todo - DRY this
    render json: intake_assessment.phonetic_questions.map do |question|
      { token: question.token, answer: question.answer, file_name: question.file_name }
    end
  end

  private def map_eidetic_questions(intake_assessment)
    intake_assessment.eidetic_questions.map do |question|
      {
        token: question.token,
        file_name: question.file_name,
        answer: question.answer
      }
    end
  end
end
