module IntakeAssessments
  class AnswerSpeechQuestion
    include Interactor

    def call
      question = context.question

      result = DecodeSpeech.call(audio_file: context.audio_file)

      if result.failure?
        question.update!(answer: 'FAILURE')
      else
        question.update!(answer: result.transcript)
      end

      assessment = question.assessment
      max_level = assessment.desd? ? 9 : 12

      if assessment.speech_assessment_current_level >= max_level
        return handle_at_maximum_level(assessment)
      end

      assessment.current_speech_question_index += 1
      assessment.save!

      questions_answered_on_level = assessment.speech_questions_answered_on_current_level
      at_end_of_level = questions_answered_on_level.count > (assessment.desd? ? 4 : 6)

      if at_end_of_level
        handle_at_end_of_level!(assessment, questions_answered_on_level)
      end

      context.assessment = assessment.reload
      context.question = question.reload
    end

    private def handle_at_maximum_level(_assessment)
      # todo - something
    end

    private def handle_at_end_of_level!(assessment, questions_at_current_level)
      correct_questions_at_level = questions_at_current_level.select { |q| q.is_correct? }
      min_correct_required = assessment.desd? ? 3 : 4

      if correct_questions_at_level.length < min_correct_required
        handle_end_of_level_failure!(assessment)
      end
    end

    private def handle_end_of_level_failure!(assessment)
      required_incorrect_count = assessment.desd? ? 5 : 7
      incorrect_questions = assessment.speech_questions.reject {|q| q.is_correct? }

      if incorrect_questions.count >= required_incorrect_count
        IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment).assessment
      end
    end
  end
end
