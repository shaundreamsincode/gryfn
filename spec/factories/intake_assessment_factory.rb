FactoryBot.define do
  factory :intake_assessment do
    before(:create) do |intake_assessment, evaluator|
      organization = create(:organization)
      account = create(:account)
      create(:badge, account: account, organization: organization)

      intake_assessment.organization = organization
      intake_assessment.created_by = account
    end
    # association :organization, factory: :organization
    # association :created_by, factory: :account, organization: :organization

    patient_first_name { Faker::Name.first_name }
    email { Faker::Internet.email }
    speech_assessment_grade_level { 0 }

    trait :desd do
      date_of_birth { Date.new(2023, 1, 1) }
    end

    trait :adt do
      date_of_birth { Date.new(1990, 1, 1) }
    end
  end
end
