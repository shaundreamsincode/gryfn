class PerformRegistration
  include Interactor

  def call
    context.account = Account.create!(
      name: context.name,
      email: context.email,
      birth_year: context.birth_year,
      country: context.country,
      zip_code: context.zip_code,
      password: context.password,
      password_confirmation: context.password_confirmation
    )

    assessment = Assessment.create!(account: context.account)
    audio_questions = create_audio_questions!(assessment)
    assessment.update!(current_audio_question_id: audio_questions.first.id)

    context.assessment = assessment
  end

  private def create_audio_questions!(assessment)
    questions = []

    questions << AudioQuestion.create!(
      assessment: assessment,
      index: 0,
      answer: 'above',
      path_to_audio_file: Rails.root.join('app', 'assets', 'audio', 'above.mp3'),
      question_type: 'phonetic'
    )

    questions << AudioQuestion.create!(
      assessment: assessment,
      index: 1,
      answer: 'achieve',
      path_to_audio_file: Rails.root.join('app', 'assets', 'audio', 'achieve.mp3'),
      question_type: 'phonetic'
    )

    questions << AudioQuestion.create!(
      assessment: assessment,
      index: 1,
      answer: 'was',
      path_to_audio_file: Rails.root.join('app', 'assets', 'audio', 'was.mp3'),
      question_type: 'eidetic'
    )

    questions << AudioQuestion.create!(
      assessment: assessment,
      index: 1,
      answer: 'what',
      path_to_audio_file: Rails.root.join('app', 'assets', 'audio', 'what.mp3'),
      question_type: 'eidetic'
    )

    questions
  end
end
