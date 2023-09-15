require 'rails_helper'

RSpec.describe PerformRegistration do
  it 'performs the registration with an ADT test when the patient is over 18 years old' do
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
    expect(IntakeSpeechQuestion.count).to eq(91)

    assessment = IntakeAssessment.first

    expect(assessment).to have_attributes(
                         patient_first_name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: 1992,
                         country: 'USA',
                         zip_code: '04076',
                         previously_diagnosed: true,
                         level_of_education: 'Bachelors',
                         organization_id: Organization.last.id,
                         assessment_type: 'adt'
                       )
  end

  it 'performs the registration with a DESD test when the patient is over 18 years old' do
    birth_year = Time.now.year - 1

    PerformRegistration.call(
      patient_first_name: 'Spongebob',
      email: 'spongebob@squarepants.com',
      birth_year: birth_year,
      country: 'USA',
      zip_code: '04076',
      previously_diagnosed: true,
      level_of_education: 'Bachelors'
    )

    expect(IntakeAssessment.count).to eq(1)
    expect(IntakeSpeechQuestion.count).to eq(50)

    assessment = IntakeAssessment.first

    expect(assessment).to have_attributes(
                         speech_current_level: 0,
                         patient_first_name: 'Spongebob',
                         email: 'spongebob@squarepants.com',
                         birth_year: birth_year,
                         country: 'USA',
                         zip_code: '04076',
                         previously_diagnosed: true,
                         level_of_education: 'Bachelors',
                         organization_id: Organization.last.id,
                         assessment_type: 'desd'
                       )
  end
end
