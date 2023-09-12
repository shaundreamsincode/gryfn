module IntakeAssessments
  class PerformRegistration
    include Interactor

    def call
      intake_assessment = context.intake_assessment

      intake_assessment.update!(
        assessment_type: calculate_assessment_type,
        date_of_birth: context.date_of_birth,
        country: context.country,
        zip_code: context.zip_code,
        previously_diagnosed: context.previously_diagnosed,
        level_of_education: context.level_of_education,
      )

      IntakeAssessments::CreateSpeechQuestions.call(assessment: intake_assessment)
      IntakeAssessments::MoveToNextStep.call(assessment: intake_assessment)
    end

    private def calculate_assessment_type
      date_of_birth = context.date_of_birth
      eighteenth_birthday = date_of_birth + 18 * 365  # Approximate, but will handle leap years

      test_type = eighteenth_birthday <= Date.today ? :adt : :desd
      IntakeAssessment::ASSESSMENT_TYPES[test_type]
    end
  end
end
