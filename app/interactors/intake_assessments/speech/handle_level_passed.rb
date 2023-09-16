module IntakeAssessments
  module Speech
    class HandleLevelPassed
      include Interactor

      def call
        assessment = context.assessment
        next_level = assessment.speech_current_level + 1

        if next_level < assessment.level_count
          move_assessment_to_next_level!(assessment)
        else
          handle_level_completion(assessment)
        end
      end

      private

      def move_assessment_to_next_level!(assessment)
        if assessment.speech_current_level == 0
          return assessment.update!(
            speech_current_level: 1,
            speech_score: 0
          )
        end

        next_level = assessment.speech_current_level + 1

        if next_level >= assessment.level_count
          assessment.update!(current_step: :fail_insufficient_incorrect)
        else
          assessment.update!(
            speech_current_level: next_level,
            speech_score: assessment.speech_score + 1
          )
        end
      end

      def handle_level_completion(assessment)
        correct_questions_on_current_level = assessment.speech_questions_on_current_level.select(&:is_correct)

        if correct_questions_on_current_level.count >= minimum_correct
          IntakeAssessments::Speech::CompleteSpeechAssessment.call(intake_assessment: assessment)
        else
          assessment.update!(current_step: :fail_insufficient_incorrect)
        end
      end

      def minimum_correct
        assessment.desd? ? 5 : 7
      end
    end
  end
end
