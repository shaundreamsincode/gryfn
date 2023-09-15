class IntakeAssessments::Speech::CompleteSpeechAssessment
  include Interactor

  def call
    _assessment = context.assessment
    return if context.errors.present?

    # score = calculate_score
    # context.assessment.update!(speech_score: score, completed_at: Time.zone.now)

    _assessment.update!(completed_at: Time.zone.now) # todo - use "completed" status/current step, not "summary"

    IntakeAssessments::CreateEideticQuestions.call(assessment: _assessment)
    IntakeAssessments::CreatePhoneticQuestions.call(assessment: _assessment)

    IntakeAssessments::MoveToNextStep.call(assessment: _assessment)
    context.assessment.reload
  end

  # private def calculate_score
  #   score = 0
  #
  #   context.assessment.level_count.times do |level|
  #     correct_at_level = IntakeSpeechQuestion.where(
  #       intake_assessment: context.assessment,
  #       level: level
  #     ).select { |question| question.is_correct? }
  #
  #     min_correct_required = context.assessment.desd? ? 3 : 4
  #     score = level if correct_at_level.count >= min_correct_required
  #   end
  #
  #   score
  # end
end
