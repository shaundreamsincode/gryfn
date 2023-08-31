FactoryBot.define do
  factory :intake_speech_question do
    intake_assessment { create(:intake_assessment) }
    correct_answer { "what" }

    trait :correct do
      answer { "what" }
      correct_answer { "what" }
    end

    trait :incorrect do
      answer { "who" }
      correct_answer { "where" }
    end
  end
end
