module IntakeAssessments
  module Speech
    class MoveToNextSpeechLevel
      include Interactor

      def call
        assessment = context.intake_assessment
        has_sufficient_correct = has_sufficient_correct?(assessment)

        if has_sufficient_correct
          handle_has_sufficient_correct!(assessment)
        else
          handle_has_insufficient_correct!(assessment)
        end

        context.intake_assessment = assessment.reload
      end

      private def handle_has_sufficient_correct!(assessment)
        next_level = assessment.speech_assessment_grade_level + 1

        if next_level < assessment.level_count
          return move_assessment_to_next_level!(assessment)
        end

        minimum_incorrect = assessment.desd? ? 5 : 7

        correct_speech_questions_on_current_level = assessment.speech_questions_on_current_level.select {|q| q.is_correct }

        IntakeAssessments::Speech::CompleteSpeechAssessment.call(intake_assessment: assessment)

        if correct_speech_questions_on_current_level.count >= minimum_correct
          IntakeAssessments::Speech::CompleteSpeechAssessment.call(intake_assessment: assessment)
        else
          assessment.update!(current_step: :fail_insufficient_incorrect)
        end
      end

      private def handle_has_insufficient_correct!(assessment)
        max_incorrect_questions_allowed = assessment.desd? ? 5 : 7
        incorrect_questions_count = assessment.speech_questions.reject {|q| q.is_correct? }.count
        too_many_incorrect_questions = incorrect_questions_count >= max_incorrect_questions_allowed

        if too_many_incorrect_questions
          min_correct_questions_allowed = assessment.desd? ? 5 : 7
          correct_questions_count = assessment.speech_questions.select {|q| q.is_correct? }.count
          sufficient_questions_correct = correct_questions_count >= min_correct_questions_allowed

          if sufficient_questions_correct
            return IntakeAssessments::Speech::CompleteSpeechAssessment.call(assessment: assessment)
          end

          return assessment.update!(current_step: :fail_insufficient_correct)
        end

        move_assessment_to_next_level!(assessment)
      end


      ### HELPER METHODS

      private def move_assessment_to_next_level!(assessment)
        next_level = assessment.speech_assessment_grade_level + 1

        if next_level >= assessment.level_count
          assessment.update!(current_step: :fail_insufficient_incorrect)
        else
          assessment.update!(speech_assessment_current_level: next_level)
        end
      end

      private def has_sufficient_correct?(assessment)
        correct_speech_questions = assessment.speech_questions_on_current_level.select { |q| q.is_correct? }
        correct_speech_questions = assessment.speech_questions_on_current_level.select { |q| q.is_correct? }
        required_speech_questions_count = assessment.required_correct_speech_questions_count

        correct_speech_questions.count >= required_speech_questions_count
      end
    end
  end
end
