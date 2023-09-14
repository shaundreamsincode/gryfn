FactoryBot.define do
  factory :intake_speech_question do
    intake_assessment { create(:intake_assessment) }
    correct_answer { "test" }

    trait :correct do
      correct_answer { answer }
    end

    trait :incorrect do
      correct_answer { answer + " (INCORRECT)" }
    end
  end
end
