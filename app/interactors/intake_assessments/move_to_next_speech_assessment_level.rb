module IntakeAssessments
  class MoveToNextSpeechAssessmentLevel
    include Interactor

    def call
      # TODO - REMOVE THIS (ITS FOR DEBUGGING)
      complete_speech_result = IntakeAssessments::CompleteSpeechAssessment.call(assessment: context.assessment)

      if complete_speech_result.error.present?
        context.fail!(error: complete_speech_result.error)
      end

      intake_assessment = context.assessment
      validate_current_step(intake_assessment)

      speech_questions = fetch_speech_questions(intake_assessment)
      validate_unanswered_questions(speech_questions)

      update_correct_and_incorrect_words(intake_assessment, speech_questions)

      correct_incorrect_word_length = intake_assessment.desd? ? 4 : 5
      evaluate_assessment_progress(intake_assessment, correct_incorrect_word_length)

      context.assessment = intake_assessment
    end

    private def validate_current_step(assessment)
      context.fail!(error: :not_in_speech_state) unless assessment.current_step == 'speech'
    end

    private def fetch_speech_questions(assessment)
      assessment.speech_questions.where(level: assessment.speech_assessment_current_level)
    end

    private def validate_unanswered_questions(questions)
      context.fail!(error: :unanswered_questions) if questions.any? { |q| q.answer.blank? }
    end

    private def update_correct_and_incorrect_words(assessment, questions)
      correct_words = questions.select(&:is_correct?).map(&:correct_answer)
      incorrect_words = questions.reject(&:is_correct?).map(&:correct_answer)

      assessment.speech_assessment_correct_words.concat(correct_words).flatten!
      assessment.speech_assessment_incorrect_words.concat(incorrect_words).flatten!
    end

    private def evaluate_assessment_progress(assessment, correct_incorrect_word_length)
      if assessment.speech_assessment_correct_words.length > correct_incorrect_word_length &&
        assessment.speech_assessment_incorrect_words.length > correct_incorrect_word_length
        complete_speech_result = IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment)

        context.fail!(error: complete_speech_result.error) if complete_speech_result.error.present?
      else
        assessment.speech_assessment_current_level += 1
        assessment.save!
      end
    end
  end
end
