module IntakeAssessments
  class CreateIntakeAssessment
    include Interactor

    def call
      account = context.account
      patient_first_name = context.patient_first_name
      email = context.email

      context.intake_assessment = IntakeAssessment.create!(
        created_by: account,
        organization: account.organization,
        patient_first_name: patient_first_name,
        email: email,
      )
    end
  end
end
