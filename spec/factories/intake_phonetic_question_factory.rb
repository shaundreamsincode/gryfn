FactoryBot.define do
  factory :intake_phonetic_question do
    intake_assessment { create(:intake_assessment) }
    file_name { "baby.mp3" }
    answer { "baby" }
    phonetic_sets { [['b','eɪ','b','i']] }
  end
end
