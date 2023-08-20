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

  def update
    # used to respond to survey questions
  end
end
