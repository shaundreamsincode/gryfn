class Api::IntakeAssessmentsController < ActionController::Base
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    eidetic_questions_json = map_intake_spelling_questions(intake_assessment, :eidetic)
    phonetic_questions_json = map_intake_spelling_questions(intake_assessment, :phonetic)


    render json: {
      token: intake_assessment.token,
      current_step: intake_assessment.current_step,
      eidetic_questions: eidetic_questions_json,
      phonetic_questions: phonetic_questions_json,
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

  def spelling_questions
    intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    render json: map_intake_spelling_questions(intake_assessment)
  end

  def speech_questions
    intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

    render json: intake_assessment.speech_questions.map { |question| question.correct_answer }
  end

  private def map_intake_spelling_questions(intake_assessment, question_type=[:eidetic, :phonetic])
    intake_assessment.intake_spelling_questions.where(question_type: question_type).map do |question|
      {
        token: question.token,
        file_name: question.file_name,
        answer: question.answer,
        question_type: question.question_type
      }
    end
  end
end
