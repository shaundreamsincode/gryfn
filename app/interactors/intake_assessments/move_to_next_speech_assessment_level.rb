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

    correct_words = speech_questions_at_current_level.select {|q| q.is_correct? }
    incorrect_problems = speech_questions_at_current_level.reject {|q| q.is_correct? }

    intake_assessment.speech_assessment_correct_words << correct_words
    intake_assessment.speech_assessment_correct_words.flatten!

    intake_assessment.speech_assessment_incorrect_words << incorrect_problems
    intake_assessment.speech_assessment_incorrect_words.flatten!

    if intake_assessment.speech_assessment_correct_words.length > 4 && intake_assessment.speech_assessment_incorrect_words.length > 4
      IntakeAssessments::CompleteSpeechAssessment.call(assessment: intake_assessment)
    else
      intake_assessment.speech_assessment_current_level += 1
      intake_assessment.save!
    end

    context.assessment.reload
  end
end
