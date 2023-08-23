FactoryBot.define do
  factory :intake_assessment do
    organization { create(:organization) }
  end
end
