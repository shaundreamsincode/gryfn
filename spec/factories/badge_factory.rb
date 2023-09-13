FactoryBot.define do
  factory :badge do
    organization { create(:organization) }
    account { create(:account) }
  end
end
