class DecodeSpeech
  include Interactor

  def call
    credentials = JSON.parse(File.read("app/controllers/concerns/credentials.json"))
    audio_file = context.audio_file

    client = Google::Cloud::Speech.speech do |config|
      config.credentials = credentials
    end

    config = {
      language_code: 'en-US',
      enable_separate_recognition_per_channel: true
    }

    recognition_file = Google::Cloud::Speech::V1::RecognitionAudio.new(content: audio_file)

    response = client.recognize(config: config, audio: recognition_file)

    result = response.results.first
    context.fail!(error: :decode_error) if result.blank?

    context.transcript = result.alternatives.first.transcript
  end
end
