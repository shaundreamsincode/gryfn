module Api
  module IntakeAssessments
    class SummaryController < ApplicationController
      def index
        intake_assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])
        render json: map_summary(intake_assessment)
      end

      private def map_summary(intake_assessment)
        {
          speech_questions: map_summary_questions(intake_assessment.speech_questions),
          eidetic_questions: map_summary_questions(intake_assessment.eidetic_questions),
          phonetic_questions: map_summary_questions(intake_assessment.phonetic_questions)
        }
      end

      private def map_summary_questions(questions)
        questions.map do |question|
          {
            token: question.token,
            answer: question.answer,
            correct_answer: question.correct_answer,
            is_correct: question.is_correct?
          }
        end
      end
    end
  end
end
