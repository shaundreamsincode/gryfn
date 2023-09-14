require "rails_helper"

RSpec.describe IntakeAssessments::CreatePhoneticQuestions do
  describe "desd" do
    describe "test case 1" do
      it "creates the correct phonetic questions" do
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        assessment = create(
          :intake_assessment, :desd,
          created_by: account,
          organization: organization,
          current_step: 'speech',
          speech_assessment_grade_level: 1,
          speech_assessment_current_level: 2
        )

        _speech_questions_level_0 = [
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'baby', index: 0, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'one', index: 1, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', index: 2, level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', index: 3, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', index: 4, level: 0)
        ]

        _speech_questions_level_1 = [
          create(:intake_speech_question, :correct, assessment: assessment, index: 5, answer: 'was', level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, index: 6, answer: 'daddy', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, index: 7, answer: 'book', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, index: 8, answer: 'good', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, index: 9, answer: 'doll',level: 1)
        ]

        _speech_questions_level_2 = [
          create(:intake_speech_question, :correct, assessment: assessment, index: 10, answer: 'girl', level: 2),
          create(:intake_speech_question, assessment: assessment, index: 11, answer: 'lollerskates', correct_answer: 'apple', level: 2), # incorrect
          create(:intake_speech_question, :correct, assessment: assessment, index: 12, answer: 'they', level: 2),
          create(:intake_speech_question, assessment: assessment, index: 13, answer: 'lollerskates', correct_answer: 'story', level: 2), # incorrect
          create(:intake_speech_question, assessment: assessment, index: 14, answer: 'lollerskates', correct_answer: 'some', level: 2) # incorrect
        ]

        _speech_questions_level_3 = [
          create(:intake_speech_question, assessment: assessment, index: 15, correct_answer: 'above', level: 3),
          create(:intake_speech_question, assessment: assessment, index: 16, correct_answer: 'what', level: 3),
          create(:intake_speech_question, assessment: assessment, index: 17, correct_answer: 'any', level: 3),
          create(:intake_speech_question, assessment: assessment, index: 18, correct_answer: 'busy', level: 3),
          create(:intake_speech_question, assessment: assessment, index: 19, correct_answer: 'night', level: 3)
        ]

        IntakeAssessments::CreatePhoneticQuestions.call(assessment: assessment)
        phonetic_questions = IntakePhoneticQuestion.all

        expect(phonetic_questions.count).to eq(5)
        expect(phonetic_questions.sort_by(&:index).pluck(:correct_answer)).to eq(%w(apple story some above what))
      end
    end
  end
end
