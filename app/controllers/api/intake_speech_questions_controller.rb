class Api::IntakeSpeechQuestionsController < ApplicationController
  def upsert_response
    question = IntakeSpeechQuestion.find_by!(token: params[:intake_speech_question_token])
    audio_file = request.body.read
    # puts "#{audio_file.inspect}"

    result = DecodeSpeech.call(audio_file: audio_file)
    question.update!(answer: result.transcript)

    # if params[:answer].nil?
    #   question.update!(answer: nil)
    # else
    # end

    render json: question
  end

  private

  def speech_to_text(audio_file)
    # credentials = JSON.parse(File.read("app/controllers/concerns/credentials.json"))
    # audio = Google::Cloud::Speech::V1::RecognitionAudio.new(content: audio_file)
    #
    # client = Google::Cloud::Speech.speech do |config|
    #   config.credentials = credentials
    # end
    #
    # config = Google::Cloud::Speech::V1::RecognitionConfig.new(
    #   encoding: :LINEAR16,
    #   sample_rate_hertz: 48000,  # Match the sample rate of your audio file
    #   language: "en-US",
    #   )
    #
    # response = client.recognize(config: config, audio: audio)
    #
    # results = response.results
    # results.each do |result|
    #   puts "Transcript: #{result.alternatives.first.transcript}"
    # end
    #
    # # client_config = {
    # #   language_code: 'en'
    # # }
    #
    # client.recognize(config: {}, audio: audio_file)
  end
end
