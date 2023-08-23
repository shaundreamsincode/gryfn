class Api::IntakeAssessmentsController < ActionController::Base
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    render json: {
      token: intake_assessment.token,
      current_question_index: intake_assessment.current_question_index,
      spelling_questions: map_intake_spelling_questions(intake_assessment)
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

  def spelling_questions
    intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    render json: map_intake_spelling_questions(intake_assessment)
  end

  private def map_intake_spelling_questions(intake_assessment)
    intake_assessment.intake_spelling_questions.map do |question|
      { token: question.token, file_name: question.file_name, answer: question.answer }
    end
  end
end
