module IntakeAssessments
  module Speech
    class HandleLevelFailed
      include Interactor

      def call
        _assessment = context.assessment
        correct_questions_at_or_below_score = fetch_correct_questions_at_or_below_score_level(_assessment)
        sufficient_correct_questions_count = _assessment.desd? ? 5 : 7

        if correct_questions_at_or_below_score.count >= sufficient_correct_questions_count
          context.assessment = IntakeAssessments::Speech::CompleteSpeechAssessment.call(
            assessment: _assessment
          ).assessment

          return
        end

        next_level = _assessment.speech_current_level + 1

        if next_level >= _assessment.level_count
          _assessment.update!(current_step: :fail_insufficient_incorrect)
        else
          _assessment.update!(speech_current_level: next_level) # do not update the score!
        end

        context.assessment = _assessment.reload
      end

      private def fetch_correct_questions_at_or_below_score_level(assessment)
        questions = []

        (0..assessment.speech_score).each do |i|
          correct_questions_on_ith_level = assessment.speech_questions_by_level(i)
          questions.concat(correct_questions_on_ith_level)
        end

        questions
      end
    end
  end
end
