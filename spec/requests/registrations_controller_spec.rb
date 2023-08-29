require 'rails_helper'

RSpec.describe RegistrationsController, type: :request do
  describe '#create' do
    it 'creates a new intake assessment'do
      params = {
        patient_first_name: 'Spongebob',
        birth_year: 1992,
        email: 'spongebob@squarepants.com',
        country: 'USA',
        zip_code: '04076',
        level_of_education: 'Bachelors',
        previously_diagnosed: true
      }

      post "/registrations", params: params

      expect(IntakeAssessment.count).to eq(1)
      expect(IntakeEideticQuestion.count).to_not eq(0)

      assessment = IntakeAssessment.last

      expect(assessment).to have_attributes(
                              patient_first_name: 'Spongebob',
                              email: 'spongebob@squarepants.com',
                              birth_year: 1992,
                              country: 'USA',
                              zip_code: '04076',
                              level_of_education: 'Bachelors',
                              previously_diagnosed: true,
                              organization_id: Organization.last.id
                            )
    end
  end
end
