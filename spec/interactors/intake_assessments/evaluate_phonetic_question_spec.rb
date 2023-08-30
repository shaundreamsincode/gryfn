require "rails_helper"

module IntakeAssessments
  RSpec.describe EvaluatePhoneticQuestion do
    describe "#call" do
      it "returns true when the answer and correct answer match" do
        phonetic_question = create(:intake_phonetic_question, answer: 'foo', correct_answer: 'foo')
        expect(EvaluatePhoneticQuestion.call(question: phonetic_question).correct).to eq(true)
      end

      it "returns true when there is a phonetic match" do
        phonetic_question = create(
          :intake_phonetic_question,
          answer: 'beighbei',
          correct_answer: 'baby',
          phonetic_sets: [['b','eɪ','b','i']]
        )

        expect(EvaluatePhoneticQuestion.call(question: phonetic_question).correct).to eq(true)
      end

      it "returns false when there is not a literal or phonetic match" do
        phonetic_question = create(
          :intake_phonetic_question,
          answer: 'foo',
          correct_answer: 'baby',
          phonetic_sets: [['b','eɪ','b','i']]
        )

        expect(EvaluatePhoneticQuestion.call(question: phonetic_question).correct).to eq(false)
      end
    end
  end
end
