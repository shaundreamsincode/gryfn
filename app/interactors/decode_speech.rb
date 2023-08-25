class DecodeSpeech
  include Interactor

  def call
    credentials = JSON.parse(File.read("app/controllers/concerns/credentials.json"))
    audio_file = context.audio_file

    # 1 / 0

    client = Google::Cloud::Speech.speech do |config|
      config.credentials = credentials
    end

    config = {
      language_code: 'en-US',
      enable_separate_recognition_per_channel: true
    }

    # file_relative_path = "public/audio/above.mp3"
    # file_absolute_path = Rails.root.join(file_relative_path)
    # audio_file = File.open(file_absolute_path)

    # byebug
    #
    recognition_file = Google::Cloud::Speech::V1::RecognitionAudio.new(content: audio_file)

    response = client.recognize(config: config, audio: recognition_file)


    results = response.results
    context.transcript = results.first.alternatives.first.transcript
    # results.each do |result|
    #   result.alternatives.first.transcript
    #   # puts "Transcript: #{result.alternatives.first.transcript}"
    # end
  end
end
