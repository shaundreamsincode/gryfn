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
          phonetic_questions: map_summary_questions(intake_assessment.phonetic_questions),

          speech_assessment_grade: intake_assessment.speech_assessment_grade_level_as_label,
          eidetic_assessment_level: intake_assessment.eidetic_assessment_level_as_label,
          phonetic_assessment_level: intake_assessment.phonetic_assessment_level_as_label,
        }
      end

      private def map_summary_questions(questions)
        questions.map do |question|
          {
            token: question.token,
            answer: question.answer,
            correct_answer: question.correct_answer,
            is_correct: question.is_correct?,
            level: question.assessment.desd? ? Data::Desd::LEVEL_LABELS[question.level] : Data::Adt::LEVEL_LABELS[question.level]
          }
        end
      end
    end
  end
end
