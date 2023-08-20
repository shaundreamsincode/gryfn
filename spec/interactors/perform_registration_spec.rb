require 'rails_helper'

RSpec.describe PerformRegistration do
  it 'performs the registration' do
    PerformRegistration.call(
      patient_first_name: 'Spongebob',
      email: 'spongebob@squarepants.com',
      birth_year: 1992,
      country: 'USA',
      zip_code: '04076'
    )

    expect(IntakeAssessment.count).to eq(1)
    expect(IntakeQuestion.count).to eq(1)

    assessment = IntakeAssessment.first
    question = IntakeQuestion.first

    expect(assessment).to have_attributes(
                         patient_first_name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: 1992,
                         country: 'USA',
                         zip_code: '04076',
                         organization_id: Organization.last.id
                       )
  end
end
