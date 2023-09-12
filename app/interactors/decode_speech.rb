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

    transcript = result.alternatives.first.transcript.downcase.split(" ")[0]
    transcript = handle_edge_cases(transcript)

    # test to see if google gave us an integer (e.g. '1')
    if transcript =~ /^\d+$/
      integer_value = transcript.to_i
      english_name = integer_value.to_words

      transcript = english_name
    end

    context.transcript = transcript
  end

  private def handle_edge_cases(transcript)
    if transcript == 'knight'
      return 'night'
    end

    if transcript == 'no'
      return 'know'
    end

    if transcript == 'their' || transcript == "they're"
      return "there"
    end

    transcript
  end
end
