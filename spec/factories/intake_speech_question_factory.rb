FactoryBot.define do
  factory :intake_speech_question do
    intake_assessment { create(:intake_assessment) }
    correct_answer { "what" }
  end
end
