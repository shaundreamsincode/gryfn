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

    assessment = IntakeAssessment.create!(account: context.account)
    audio_questions = create_audio_questions!(assessment)
    assessment.update!(current_audio_question_id: audio_questions.first.id)

    context.assessment = assessment
  end

  private def create_audio_questions!(assessment)
    questions = []

    # PHONETIC QUESTIONS
    questions << IntakeAudioQuestion.create!(
      intake_assessment: assessment,
      index: 0,
      answer: 'above',
      file_name: 'above.mp3',
      question_type: 'phonetic'
    )

    questions << IntakeAudioQuestion.create!(
      intake_assessment: assessment,
      index: 1,
      answer: 'achieve',
      file_name: 'achieve.mp3',
      question_type: 'phonetic'
    )

    # EIDETIC QUESTIONS
    questions << IntakeAudioQuestion.create!(
      intake_assessment: assessment,
      index: 1,
      answer: 'was',
      file_name: 'was.mp3',
      question_type: 'eidetic'
    )

    questions << IntakeAudioQuestion.create!(
      intake_assessment: assessment,
      index: 1,
      answer: 'what',
      file_name: 'what.mp3',
      question_type: 'eidetic'
    )

    questions
  end
end
