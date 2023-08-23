FactoryBot.define do
  factory :intake_speech_question do
    intake_assessment { create(:intake_assessment) }
    file_name { "audio_file_#{rand(500)}.mp3" }
  end
end
