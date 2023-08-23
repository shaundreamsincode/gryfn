require "rails_helper"

RSpec.describe Api::IntakeAssessmentsController, type: :request do
  describe "#speech_questions" do
    it "returns the speech questions on the intake assessment" do
      assessment = create(:intake_assessment)
      speech_question = create(:intake_speech_question, intake_assessment: assessment)
      _other_speech_question = create(:intake_speech_question)

      get "/api/intake_assessments/#{assessment.token}/speech_questions"
      expect(response.status).to eq(200)

      expect(JSON.parse(response.body).length).to eq(1)
      expect(JSON.parse(response.body)[0]).to include(
                                                'token' => speech_question.token,
                                                'file_name' => speech_question.file_name
                                              )
    end
  end
end
