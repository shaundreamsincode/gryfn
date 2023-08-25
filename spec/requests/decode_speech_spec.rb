require "rails_helper"

RSpec.describe DecodeSpeech do
  it do
    file_relative_path = "public/audio/above.mp3"
    file_absolute_path = Rails.root.join(file_relative_path)
    audio_file = File.open(file_absolute_path)
    foo = DecodeSpeech.call(audio_file: audio_file)
  end
end
