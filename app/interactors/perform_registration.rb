class PerformRegistration
  include Interactor

  def call
    account = Account.create!(
      name: context.name,
      email: context.email,
      birth_year: context.birth_year,
      country: context.country,
      zip_code: context.zip_code,
      password: context.password,
      password_confirmation: context.password_confirmation
    )

    intake_assessment = IntakeAssessment.create!(account: account)
    create_questions!(intake_assessment)
    context.intake_assessment = intake_assessment
  end

  private def create_questions!(intake_assessment)
    questions = []

    questions << IntakeQuestion.create!(
      intake_assessment: intake_assessment,
      index: 0,
      answer: 'above',
      file_name: 'above.mp3',
    )

    # questions << IntakeQuestion.create!(
    #   intake_assessment: assessment,
    #   index: 1,
    #   answer: 'achieve',
    #   file_name: 'achieve.mp3',
    # )
    #
    # questions << IntakeQuestion.create!(
    #   intake_assessment: assessment,
    #   index: 1,
    #   answer: 'was',
    #   file_name: 'was.mp3'
    # )
    #
    # questions << IntakeQuestion.create!(
    #   intake_assessment: assessment,
    #   index: 1,
    #   answer: 'what',
    #   file_name: 'what.mp3'
    # )

    questions
  end
end
