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
        correct_speech_questions = assessment.speech_questions_on_current_level.select { |q| q.is_correct? }
        required_speech_questions_count = assessment.required_correct_speech_questions_count

        correct_speech_questions.count >= required_speech_questions_count
      end
    end
  end
end
