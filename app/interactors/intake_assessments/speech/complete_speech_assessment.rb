class IntakeAssessments::Speech::CompleteSpeechAssessment
  include Interactor

  def call
    _assessment = context.assessment
    return if context.errors.present?

    # TODO - remove this (or rename it speech_assessment_completed_at?)
    _assessment.update!(completed_at: Time.zone.now) # todo - use "completed" status/current step, not "summary"

    IntakeAssessments::CreateEideticQuestions.call(assessment: _assessment)
    IntakeAssessments::CreatePhoneticQuestions.call(assessment: _assessment)

    IntakeAssessments::MoveToNextStep.call(assessment: _assessment)
    context.assessment.reload
  end
end
