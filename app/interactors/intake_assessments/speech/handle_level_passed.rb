module IntakeAssessments
  module Speech
    class HandleLevelPassed
      include Interactor

      def call
        _assessment = context.assessment
        next_level = _assessment.speech_current_level + 1

        if next_level < _assessment.level_count
          context.assessment = move_assessment_to_next_level!(_assessment)
          return
        end

        correct_speech_questions_on_current_level = _assessment
                                                      .speech_questions_on_current_level
                                                      .select {|q| q.is_correct }

        if correct_speech_questions_on_current_level.count >= minimum_correct
          IntakeAssessments::Speech::CompleteSpeechAssessment.call(intake_assessment: _assessment)
        else
          assessment.update!(current_step: :fail_insufficient_incorrect)
        end
      end

      private def move_assessment_to_next_level!(assessment)
        next_level = assessment.speech_current_level + 1

        if next_level >= assessment.level_count
          return assessment.update!(current_step: :fail_insufficient_incorrect)
        end
        assessment.update!(
          speech_current_level: next_level,
          speech_score: assessment.speech_score + 1
        )
      end
    end
  end
end
