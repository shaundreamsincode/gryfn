require 'rails_helper'

RSpec.describe RegistrationsController, type: :request do
  describe '#create' do
    it 'creates a new intake assessment'do
      params = {
        name: 'name',
        birth_year: 1992,
        email: 'email@gmail.com',
        country: 'USA',
        zip_code: '04076',
        password: 'password',
        password_confirmation: 'password'
      }

      post "/registrations", params: params

      expect(IntakeAssessment.count).to eq(1)
      expect(IntakeQuestion.count).to eq(1)
    end
  end
end
