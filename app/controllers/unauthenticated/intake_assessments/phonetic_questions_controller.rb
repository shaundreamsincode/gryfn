module Unauthenticated
  module IntakeAssessments
    class PhoneticQuestionsController < UnauthenticatedController
      def index
        intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

        # todo - DRY this
        render json: intake_assessment.phonetic_questions.map do |question|
          {
            token: question.token,
            answer: question.answer,
            file_name: question.file_name,
            assessment_token: intake_assessment.token
          }
        end
      end

      def update
        question = IntakePhoneticQuestion.find_by!(token: params[:token])
        question.update!(answer: params[:answer])

        render json: question
      end
    end
  end
end
