class PerformRegistration
  include Interactor

  def call
    context.account = Account.create!(
      name: context.name,
      email: context.email,
      birth_year: context.birth_year,
      country: context.country,
      zip_code: context.zip_code
    )

    assessment = Assessment.create!(account: context.account)
    audio_questions = create_audio_questions!(assessment)
    assessment.current_audio_question_id = audio_questions.first.id # todo - rails-ify

    context.assessment = assessment
  end


  private def create_audio_questions!(assessment)

  end
end
