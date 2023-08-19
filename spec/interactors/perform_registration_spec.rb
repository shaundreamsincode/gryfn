require 'rails_helper'

RSpec.describe PerformRegistration do
  it 'creates a new account' do
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
    expect(Assessment.count).to eq(1)
    expect(AudioQuestion.count).to eq(4)

    account = Account.first
    assessment = Assessment.first
    audio_question = AudioQuestion.first

    expect(account).to have_attributes(
                         name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: 1992,
                         country: 'USA',
                         zip_code: '04076'
                       )

    expect(assessment).to have_attributes(
                            account_id: account.id,
                            survey_question_response_id: nil,
                            current_audio_question_id: audio_question.id
                          )
  end
end
