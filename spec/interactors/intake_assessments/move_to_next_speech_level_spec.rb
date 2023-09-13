require "rails_helper"

RSpec.describe MoveToNextSpeechLevel do
  describe "#call" do
    describe "test case one" do
      _correct_speech_questions = [
        create(:intake_speech_question, :correct, assessment: assessment, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, level: 2),
        create(:intake_speech_question, :correct, assessment: assessment, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, level: 1),
      ]

      _incorrect_speech_questions = [
        create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
        create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
        create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, level: 3)
      ]
    end
  end
end