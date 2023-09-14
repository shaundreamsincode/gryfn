require "rails_helper"

RSpec.describe IntakeAssessments::CreateEideticQuestions do
  describe "desd" do
    it "test case 1" do
      organization = create(:organization)
      account = create(:account)
      _badge = create(:badge, account: account, organization: organization)
      assessment = create(
        :intake_assessment, :desd,
        created_by: account,
        organization: organization,
        current_step: 'speech',
        speech_assessment_grade_level: 1
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
        create(:intake_speech_question, :incorrect, assessment: assessment, index: 11, answer: 'apple', level: 2),
        create(:intake_speech_question, :correct, assessment: assessment, index: 12, answer: 'they', level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, index: 13, answer: 'story', level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, index: 14, answer: 'some', level: 2)
      ]

      IntakeAssessments::CreateEideticQuestions.call(assessment: assessment)
      eidetic_questions = IntakeEideticQuestion.all

      expect(eidetic_questions.count).to eq(5)
      expect(eidetic_questions.sort_by(&:index).pluck(:correct_answer)).to eq(%w(doll good book was car))
    end
  end
end
