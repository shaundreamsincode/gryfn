class PerformRegistration
  include Interactor

  def call
    intake_assessment = IntakeAssessment.create!(
      speech_assessment_current_level: 0,
      organization: fetch_organization,
      assessment_type: calculate_assessment_type,
      patient_first_name: context.patient_first_name,
      email: context.email,
      birth_year: context.birth_year,
      country: context.country,
      zip_code: context.zip_code,
      previously_diagnosed: context.previously_diagnosed,
      level_of_education: context.level_of_education
    )

    IntakeAssessments::CreateSpeechQuestions.call(assessment: intake_assessment)
    IntakeEideticQuestion.create_questions_for_assessment!(intake_assessment)
    IntakePhoneticQuestion.create_questions_for_assessment!(intake_assessment)

    context.intake_assessment = intake_assessment
  end

  private def fetch_organization
    organization = Organization.first
    return organization if organization.present?

    Organization.create(name: 'Default Organization')
  end

  private def calculate_assessment_type
    if Time.now.year - context.birth_year.to_i < 18
      return IntakeAssessment::ASSESSMENT_TYPES[:desd]
    end

    IntakeAssessment::ASSESSMENT_TYPES[:adt]
  end
end
