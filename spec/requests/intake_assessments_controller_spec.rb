require "rails_helper"

# TODO - WRITE TESTS FOR ADT
RSpec.describe Api::IntakeAssessmentsController, type: :request do
  describe "#move_speech_assessment_to_next_level" do
    it do
      intake_assessment = create(:intake_assessment, speech_current_level: 1)

      post "/api/intake_assessments/#{intake_assessment.token}/move_speech_assessment_to_next_level"
      expect(intake_assessment.reload.speech_current_level).to eq(2)
    end

    context "when there is a speech question at the current level that is unanswered" do
      it "is an unsuccessful request" do
        intake_assessment = create(:intake_assessment, speech_current_level: 1)
        _unanswered_question = create(:intake_speech_question, assessment: intake_assessment, level: 1)

        post "/api/intake_assessments/#{intake_assessment.token}/move_speech_assessment_to_next_level"
        expect(response.status).to eq(422)
        expect(JSON.parse(response.body)).to eq({"error"=>"unanswered_questions"})
      end
    end

    context "when there are 5 questions answered correct, and 5 that are not" do
      it "sets the intake assessment's current step to `eidetic` and creates eidetic (for correct) and phonetic (for incorrect) questions" do
        intake_assessment = create(
          :intake_assessment,
          speech_assessment_correct_words: ['bear', 'baby', 'cow', 'deer', 'elf'],
          speech_assessment_incorrect_words: ['zebra', 'yay', 'x-ray', 'war', 'vet'],
          speech_current_level: 1
        )

        post "/api/intake_assessments/#{intake_assessment.token}/move_speech_assessment_to_next_level"
        intake_assessment.reload
        expect(intake_assessment.current_step).to eq('eidetic')

        expect(IntakeEideticQuestion.count).to eq(5)
        expect(IntakePhoneticQuestion.count).to eq(5)

        eidetic_questions = IntakeEideticQuestion.order(index: :desc)
        eidetic_questions_answer_data = eidetic_questions.pluck(:correct_answer)
        expect(eidetic_questions_answer_data).to eq(["doll", "good", "book", "daddy", "was"])

        phonetic_questions = IntakeEideticQuestion.order(index: :desc)
        phonetic_questions_answer_data = phonetic_questions.pluck(:correct_answer)
        expect(phonetic_questions_answer_data).to eq(["doll", "good", "book", "daddy", "was"])
      end
    end
  end
end
