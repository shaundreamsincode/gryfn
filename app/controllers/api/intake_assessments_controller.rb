class Api::IntakeAssessmentsController < ActionController::Base
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    intake_assessment_questions_json = intake_assessment.intake_eidetic_questions.map do |question|
      { token: question.token, file_name: question.file_name, answer: question.answer }
    end

    render json: {
      token: intake_assessment.token,
      current_question_index: intake_assessment.current_question_index,
      questions: intake_assessment_questions_json
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
end
