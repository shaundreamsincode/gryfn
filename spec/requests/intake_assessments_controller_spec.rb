require "rails_helper"

RSpec.describe Api::IntakeAssessmentsController, type: :request do
  describe "#move_speech_assessment_to_next_level" do
    it do
      intake_assessment = create(:intake_assessment, speech_assessment_current_level: 1)

      post "/api/intake_assessments/#{intake_assessment.token}/move_speech_assessment_to_next_level"
      expect(intake_assessment.reload.speech_assessment_current_level).to eq(2)
    end

    context "when there is a speech question at the current level that is unanswered" do
      it "is an unsuccessful request" do
        intake_assessment = create(:intake_assessment, speech_assessment_current_level: 1)
        _unanswered_question = create(:intake_speech_question, assessment: intake_assessment, level: 1)

        post "/api/intake_assessments/#{intake_assessment.token}/move_speech_assessment_to_next_level"
        expect(response.status).to eq(422)

        # todo - spec for body
      end
    end

    context "when there are 5 questions answered correct, and 5 that are not" do
      it "sets the speech assessment current level to nil" do
        intake_assessment = create(
          :intake_assessment,
          speech_assessment_correct_words: ['a', 'b', 'c', 'd', 'e'],
          speech_assessment_incorrect_words: ['0', '1', '2', '3', '4'],
          speech_assessment_current_level: 1
        )

        post "/api/intake_assessments/#{intake_assessment.token}/move_speech_assessment_to_next_level"
        expect(intake_assessment.reload.speech_assessment_current_level).to eq(nil)
      end
    end
  end
end
