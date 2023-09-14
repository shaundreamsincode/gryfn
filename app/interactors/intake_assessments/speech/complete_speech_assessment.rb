class IntakeAssessments::Speech::CompleteSpeechAssessment
  include Interactor

  def call
    _assessment = context.assessment
    return if context.errors.present?

    grade = calculate_grade

    context.assessment.update!(speech_assessment_grade_level: grade, completed_at: Time.zone.now)

    IntakeAssessments::CreateEideticQuestions.call(assessment: _assessment)
    IntakeAssessments::CreatePhoneticQuestions.call(assessment: _assessment)

    IntakeAssessments::MoveToNextStep.call(assessment: context.assessment)
    context.assessment.reload
  end

  # should return an integer
  private def calculate_grade
    grade = 0

    context.assessment.level_count.times do |level|
      correct_at_level = IntakeSpeechQuestion.where(
        intake_assessment: context.assessment,
        level: level
      ).select { |question| question.is_correct? }

      min_correct_required = context.assessment.desd? ? 3 : 4
      grade = level if correct_at_level.count >= min_correct_required
    end

    grade
  end
end
