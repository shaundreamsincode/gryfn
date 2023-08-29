FactoryBot.define do
  factory :intake_phonetic_question do
    intake_assessment { create(:intake_assessment) }
    file_name { "foo.mp3" }
    answer { "foo" }
  end
end
