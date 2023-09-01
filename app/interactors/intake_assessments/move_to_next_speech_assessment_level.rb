class IntakeAssessments::MoveToNextSpeechAssessmentLevel
  include Interactor

  def call
    intake_assessment = context.assessment
    context.fail!(error: :not_in_speech_state) unless intake_assessment.current_step == 'speech'

    current_level = intake_assessment.speech_assessment_current_level
    speech_questions_at_current_level = intake_assessment.speech_questions.where(level: current_level)

    if speech_questions_at_current_level.any? {|q| q.answer.blank? }
      context.fail!(error: :unanswered_questions)
    end

    correct_words = speech_questions_at_current_level.select {|q| q.is_correct? }.map(&:correct_answer)
    incorrect_words = speech_questions_at_current_level.reject {|q| q.is_correct? }.map(&:correct_answer)

    intake_assessment.speech_assessment_correct_words.concat(correct_words).flatten!
    intake_assessment.speech_assessment_incorrect_words.concat(incorrect_words).flatten!

    correct_incorrect_word_length = intake_assessment.desd? ? 4 : 5

    if intake_assessment.speech_assessment_correct_words.length > correct_incorrect_word_length &&
      intake_assessment.speech_assessment_incorrect_words.length > correct_incorrect_word_length
      IntakeAssessments::CompleteSpeechAssessment.call(assessment: intake_assessment)
    else
      intake_assessment.speech_assessment_current_level += 1
      intake_assessment.save!
    end

    context.assessment = intake_assessment
  end
end
