class IntakeAssessments::MoveToNextStep
  include Interactor

  def call
    send("handle_current_step_#{context.assessment.current_step}")
  end

  private def handle_current_step_speech
    context.assessment.eidetic!
  end

  private def handle_current_step_eidetic
    context.assessment.phonetic!
  end

  private def handle_current_step_phonetic
    context.assessment.summary!
  end

  private def handle_current_step_summary
    # no-op
  end
end
