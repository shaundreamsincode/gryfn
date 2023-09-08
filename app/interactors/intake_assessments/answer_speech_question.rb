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
      assessment.current_speech_question_index += 1
      assessment.save!

      questions_answered_on_level = assessment.speech_questions_answered_on_current_level

      if questions_answered_on_level.count > assessment.desd? ? 4 : 6
        handle_at_end_of_level!(assessment, questions_answered_on_level)
        # todo - reload after?
      end

      context.question = question.reload
    end

    private def handle_at_end_of_level!(assessment, questions_at_current_level)
      correct_questions = questions_at_current_level.select { |q| q.is_correct? }
      incorrect_questions = questions_at_current_level.reject { |q| q.is_correct? }

      min_correct_required = account.desd? ? 3 : 4

      if correct_questions.length < min_correct_required
        return handle_end_of_level_failure!(assessment)
      end

      handle_end_of_level_success!(assessment)
    end

    private def handle_end_of_level_success!(assessment)
      max_level = account.desd? ? 9 : 12

      if assessment.speech_assessment_current_level > max_level
        # assessment.update!()
        # we have run out of questions. set status to error
      end
    end

    private def handle_end_of_level_failure!(assessment)
      required_incorrect_count = assessment.desd? ? 5 : 7
      incorrect_questions = assessment.speech_questions.reject {|q| q.is_correct? }

      if incorrect_questions.count >= required_incorrect_count

      end
    end
  end
end
