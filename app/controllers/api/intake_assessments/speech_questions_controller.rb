module Api
  module IntakeAssessments
    class SpeechQuestionsController < ApplicationController
      def index
        intake_assessment = IntakeAssessment.find_by!(token: params[:intake_assessment_token])

        render json: intake_assessment.speech_questions.map do |question|
          { token: question.token, answer: question.answer, correct_answer: question.correct_answer }
        end
      end
    end
  end
end
