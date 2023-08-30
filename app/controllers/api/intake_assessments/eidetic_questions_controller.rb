module Api
  module IntakeAssessments
    class EideticQuestionsController < ApplicationController
      def index
        intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

        # todo - DRY this
        render json: intake_assessment.eidetic_questions.map do |question|
          { token: question.token, answer: question.answer, file_name: question.file_name }
        end
      end
    end
  end
end
