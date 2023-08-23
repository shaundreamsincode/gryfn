class PerformRegistration
  include Interactor

  def call
    intake_assessment = IntakeAssessment.create!(
      patient_first_name: context.patient_first_name,
      email: context.email,
      birth_year: context.birth_year,
      country: context.country,
      zip_code: context.zip_code,
      previously_diagnosed: context.previously_diagnosed,
      level_of_education: context.level_of_education,
      organization: fetch_organization,
    )

    IntakeSpellingQuestion.create_questions_for_assessment!(intake_assessment)
    context.intake_assessment = intake_assessment
  end

  private def fetch_organization
    organization = Organization.first
    return organization if organization.present?

    Organization.create(name: 'Foo Org')
  end
end
