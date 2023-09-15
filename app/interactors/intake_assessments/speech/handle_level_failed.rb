module IntakeAssessments
  module Speech
    class HandleLevelFailed
      include Interactor

      def call
        _assessment = context.assessment

        max_incorrect_questions_allowed = _assessment.desd? ? 5 : 7
        incorrect_questions_count = _assessment.speech_questions.reject {|q| q.is_correct? }.count
        too_many_incorrect_questions = incorrect_questions_count >= max_incorrect_questions_allowed

        if too_many_incorrect_questions
          min_correct_questions_allowed = _assessment.desd? ? 5 : 7
          correct_questions_count = _assessment.speech_questions.select {|q| q.is_correct? }.count
          sufficient_questions_correct = correct_questions_count >= min_correct_questions_allowed

          if sufficient_questions_correct
            IntakeAssessments::Speech::CompleteSpeechAssessment.call(assessment: _assessment)
            context.assessment = _assessment.reload
            return
          end

          _assessment.update!(current_step: :fail_insufficient_correct)
          return
        end

        move_assessment_to_next_level!(_assessment)
        context.assessment = _assessment.reload
      end

      private def move_assessment_to_next_level!(assessment)
        next_level = assessment.speech_current_level + 1

        if next_level >= assessment.level_count
          assessment.update!(current_step: :fail_insufficient_incorrect)
        else
          assessment.update!(speech_current_level: next_level)
        end

        assessment
      end
    end
  end
end
