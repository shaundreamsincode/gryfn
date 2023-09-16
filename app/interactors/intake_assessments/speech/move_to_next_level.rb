module IntakeAssessments
  module Speech
    class MoveToNextLevel
      include Interactor

      def call
        _assessment = context.assessment
        has_sufficient_correct = has_sufficient_correct?(_assessment)

        if has_sufficient_correct
          IntakeAssessments::Speech::HandleLevelPassed.call(assessment: _assessment)
        else
          IntakeAssessments::Speech::HandleLevelFailed.call(assessment: _assessment)
        end

        context.intake_assessment = _assessment.reload
      end

      private def has_sufficient_correct?(assessment)
        sufficient_correct = assessment.desd? ? 3 : 4
        correct_speech_questions = assessment.speech_questions_on_current_level.select { |q| q.is_correct? }

        correct_speech_questions.count >= sufficient_correct
      end
    end
  end
end
