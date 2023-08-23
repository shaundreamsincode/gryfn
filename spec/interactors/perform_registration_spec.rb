require 'rails_helper'

RSpec.describe PerformRegistration do
  it 'performs the registration' do
    PerformRegistration.call(
      patient_first_name: 'Spongebob',
      email: 'spongebob@squarepants.com',
      birth_year: 1992,
      country: 'USA',
      zip_code: '04076',
      previously_diagnosed: true,
      level_of_education: 'Bachelors'
    )

    expect(IntakeAssessment.count).to eq(1)
    expect(IntakeEideticQuestion.count).to_not eq(0)

    assessment = IntakeAssessment.first
    question = IntakeEideticQuestion.first

    expect(assessment).to have_attributes(
                         patient_first_name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: 1992,
                         country: 'USA',
                         zip_code: '04076',
                         previously_diagnosed: true,
                         level_of_education: 'Bachelors',
                         organization_id: Organization.last.id
                       )
  end
end
