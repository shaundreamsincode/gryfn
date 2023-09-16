module IntakeAssessments
  module Speech
    class HandleLevelFailed
      include Interactor

      def call
        assessment = context.assessment

        if assessment.speech_current_level == 0
          return handle_on_first_speech_level(assessment)
        end

        if sufficient_correct_questions?(assessment)
          return complete_speech_assessment(assessment)
        end

        if maximum_incorrect_questions_reached?(assessment)
          return fail_insufficient_correct(assessment)
        end

        update_assessment_level(assessment)
      end

      private def handle_on_first_speech_level(assessment)
        correct_questions_required = assessment.desd? ? 3: 5
        correct_questions_on_level = assessment.speech_questions_by_level(0).select { |q| q.is_correct? }

        if correct_questions_on_level.count < correct_questions_required
          fail_insufficient_correct(assessment)
        else
          update_assessment_level(assessment)
        end
      end

      private def handle_insufficient_correct_questions(assessment)
        if maximum_incorrect_questions_reached?(assessment)
          return fail_insufficient_correct(assessment)
        end

        if assessment.speech_current_step >= level_count
          fail_insufficient_correct(assessment)
        else
          update_assessment_level(assessment)
        end
      end

      private def sufficient_correct_questions?(assessment)
        sufficient_count = assessment.desd? ? 5 : 7
        correct_questions_at_or_below_score(assessment).count >= sufficient_count
      end

      private def maximum_incorrect_questions_reached?(assessment)
        maximum_count = assessment.desd? ? 4 : 6
        incorrect_questions_at_or_below_score(assessment).count > maximum_count
      end

      private def complete_speech_assessment(assessment)
        IntakeAssessments::Speech::CompleteSpeechAssessment.call(assessment: assessment).assessment
      end

      private def fail_insufficient_correct(assessment)
        assessment.update!(current_step: :fail_insufficient_correct)
      end

      private def update_assessment_level(assessment)
        next_level = assessment.speech_current_level + 1

        if next_level >= assessment.level_count
          assessment.update!(current_step: :fail_insufficient_correct)
        else
          assessment.update!(speech_current_level: next_level) # do not update the score!
        end

        assessment
      end

      private def correct_questions_at_or_below_score(assessment)
        questions = []

        (0..assessment.speech_score).each do |i|
          correct_questions_ith_level = assessment.speech_questions_by_level(i).select(&:is_correct?)
          questions.concat(correct_questions_ith_level)
        end

        questions.flatten
      end

      private def incorrect_questions_at_or_below_score(assessment)
        questions = []

        (0..assessment.speech_current_level).each do |i|
          incorrect_questions_ith_level = assessment.speech_questions_by_level(i).reject(&:is_correct?)
          questions.concat(incorrect_questions_ith_level)
        end

        questions.flatten
      end
    end
  end
end
