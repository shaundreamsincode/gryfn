module Unauthenticated
  module IntakeAssessments
    class SummaryController < UnauthenticatedController
      def index
        intake_assessment = IntakeAssessment.find_by_token!(params[:intake_assessment_token])
        render json: map_summary(intake_assessment)
      end

      private def map_summary(intake_assessment)
        speech_score = intake_assessment.desd? ?  Data::Desd::LEVEL_LABELS[intake_assessment.speech_score] :
                         Data::Adt::LEVEL_LABELS[intake_assessment.speech_score]

        speech_current_level = intake_assessment.desd? ?  Data::Desd::LEVEL_LABELS[intake_assessment.speech_current_level] :
                                 Data::Adt::LEVEL_LABELS[intake_assessment.speech_current_level]
        {
          speech_questions: map_summary_questions(intake_assessment.speech_questions),
          eidetic_questions: map_summary_questions(intake_assessment.eidetic_questions),
          phonetic_questions: map_summary_questions(intake_assessment.phonetic_questions),
          can_send_summary_email: intake_assessment.email == 'test@gryfn.io',
          speech_score: speech_score,
          speech_current_level: speech_current_level
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
