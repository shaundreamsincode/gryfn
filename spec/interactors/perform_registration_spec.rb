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

    expect(IntakeAssessment.count).to eq(1)
    expect(IntakeQuestion.count).to eq(1)

    assessment = IntakeAssessment.first
    question = IntakeQuestion.first

    expect(assessment).to have_attributes(
                         name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: 1992,
                         country: 'USA',
                         zip_code: '04076'
                       )
  end
end
