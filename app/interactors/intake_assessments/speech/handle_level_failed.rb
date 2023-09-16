module IntakeAssessments
  module Speech
    class HandleLevelFailed
      include Interactor

      def call
        _assessment = context.assessment
        correct_questions_at_or_below_score = fetch_correct_questions_at_or_below_score(_assessment)
        sufficient_correct_questions_count = _assessment.desd? ? 5 : 7

        if correct_questions_at_or_below_score.count >= sufficient_correct_questions_count
          context.assessment = IntakeAssessments::Speech::CompleteSpeechAssessment.call(
            assessment: _assessment
          ).assessment

          return
        end

        incorrect_questions_at_or_below_score = fetch_incorrect_questions_at_or_below_score(_assessment)
        maximum_incorrect_questions_before_stop_count = _assessment.desd? ? 4 : 6

        if incorrect_questions_at_or_below_score.count > maximum_incorrect_questions_before_stop_count
          context.assessment = _assessment.update!(current_step: :fail_insufficient_correct)
          return
        end

        next_level = _assessment.speech_current_level + 1

        if next_level >= _assessment.level_count
          _assessment.update!(current_step: :fail_insufficient_correct)
        else
          _assessment.update!(speech_current_level: next_level) # do not update the score!
        end

        context.assessment = _assessment.reload
      end

      private def fetch_correct_questions_at_or_below_score(assessment)
        questions = []

        (0..assessment.speech_score).each do |i|
          correct_questions_ith_level = assessment.speech_questions_by_level(i).select { |q| q.is_correct? }
          questions.concat(correct_questions_ith_level)
        end

        questions.flatten
      end

      private def fetch_incorrect_questions_at_or_below_score(assessment)
        questions = []

        (0..assessment.speech_current_level).each do |i|
          incorrect_questions_ith_level = assessment.speech_questions_by_level(i).reject { |q| q.is_correct? }
          questions.concat(incorrect_questions_ith_level)
        end

        questions.flatten
      end
    end
  end
end
