FactoryBot.define do
  factory :intake_assignment do
    organization { create(:organization) }

    trait :desd do
      assessment_type :desd
    end

    traid :adt do
      assessment_type :adt
    end
  end
end
