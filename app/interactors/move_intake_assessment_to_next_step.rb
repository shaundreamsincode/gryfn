class MoveIntakeAssessmentToNextStep
  include Interactor

  def call
    send("move_from_#{context.intake_assessment.current_step}")
  end

  private def move_from_speech
    there_are_unanswered_questions = context.intake_assessment.speech_questions.any? {|q| q.answer.blank? }

    if there_are_unanswered_questions
      context.fail!(error: "There are unanswered questions!")
    end

    context.intake_assessment.update!(current_step: :eidetic)
  end

  private def move_from_eidetic

  end

  private def move_from_phonetic

  end
end
