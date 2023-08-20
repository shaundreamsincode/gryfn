class Api::IntakeAssessmentsController < ActionController::Base
  def show
    intake_assessment = IntakeAssessment.find_by!(token: params[:token])

    intake_assessment_questions_json = intake_assessment.intake_questions.map do |question|
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

    questions_correct = 0

    assessment.intake_questions.each do |question|
      questions_correct +=1 if question.answer.downcase == question.correct_answer.downcase
    end

    render json: { questions_count: assessment.intake_questions.count, questions_correct: questions_correct }
  end
end
