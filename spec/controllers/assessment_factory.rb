FactoryBot.define do
  factory :intake_assignment do
    organization { create(:organization) }
  end
end
