require 'rails_helper'

RSpec.describe PerformRegistration do
  it 'performs the registration' do
    PerformRegistration.call(
      name: 'Spongebob',
      email: 'spongebob@squarepants.com',
      birth_year: 1992,
      password: 'password',
      password_confirmation: 'password',
      country: 'USA',
      zip_code: '04076'
    )

    expect(Account.count).to eq(1)
    expect(IntakeAssessment.count).to eq(1)
    expect(IntakeAudioQuestion.count).to eq(4)

    account = Account.first
    assessment = IntakeAssessment.first
    audio_question = IntakeAudioQuestion.first

    expect(account).to have_attributes(
                         name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: 1992,
                         country: 'USA',
                         zip_code: '04076'
                       )

    expect(assessment).to have_attributes(
                            account_id: account.id,
                            intake_survey_response_id: nil,
                            current_audio_question_id: audio_question.id
                          )
  end
end
