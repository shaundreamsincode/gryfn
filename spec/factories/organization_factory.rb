FactoryBot.define do
  factory :organization do
    name { "Organization ##{rand(500)}" }
  end
end
