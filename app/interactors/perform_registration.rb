class PerformRegistration
  include Interactor

  def call
    intake_assessment = IntakeAssessment.create!(
      speech_assessment_current_level: 0,
      organization: fetch_organization,
      created_by: fetch_created_by,
      assessment_type: calculate_assessment_type,
      patient_first_name: context.patient_first_name,
      email: context.email,
      birth_year: context.birth_year,
      country: context.country,
      zip_code: context.zip_code,
      previously_diagnosed: context.previously_diagnosed,
      level_of_education: context.level_of_education,
      current_speech_question_index: 0
    )

    IntakeAssessments::CreateSpeechQuestions.call(assessment: intake_assessment)
    context.intake_assessment = intake_assessment.reload
  end

  private def fetch_organization
    @_organization ||= Organization.find_by!(name: 'ACME corp')
  end

  private def fetch_created_by
    @_created_by ||= fetch_organization.accounts.first
  end

  private def calculate_assessment_type
    if Time.now.year - context.birth_year.to_i < 18
      return IntakeAssessment::ASSESSMENT_TYPES[:desd]
    end

    IntakeAssessment::ASSESSMENT_TYPES[:adt]
  end
end
