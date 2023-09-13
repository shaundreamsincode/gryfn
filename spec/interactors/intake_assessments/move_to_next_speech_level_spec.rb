require "rails_helper"

RSpec.describe IntakeAssessments::Speech::MoveToNextSpeechLevel do
  describe "#call" do
    describe "desd" do
      it do
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        assessment = create(:intake_assessment, :desd, created_by: account, organization: organization) # todo - remove organization id?

        speech_questions_level_0 = [
          create(:intake_speech_question, assessment: assessment, answer: 'baby', correct_answer: 'baby', level: 0), # correct
          create(:intake_speech_question, assessment: assessment, answer: 'one', correct_answer: 'incorrect', level: 0), # incorrect
          create(:intake_speech_question, assessment: assessment, answer: 'boat', correct_answer: 'boat', level: 0), # correct
          create(:intake_speech_question, assessment: assessment, answer: 'do', correct_answer: 'incorrect', level: 0), # incorrect
          create(:intake_speech_question, assessment: assessment, answer: 'car', correct_answer: 'car', level: 0) # correct
        ]

        speech_questions_level_1 = [
          create(:intake_speech_question, assessment: assessment, answer: 'was', correct_answer: 'was', level: 0), # correct
          create(:intake_speech_question, assessment: assessment, answer: 'daddy', correct_answer: 'daddy', level: 0), # correct
          create(:intake_speech_question, assessment: assessment, answer: 'boat', correct_answer: 'incorrect', level: 0), # correct
          create(:intake_speech_question, assessment: assessment, answer: 'do', correct_answer: 'incorrect', level: 0), # incorrect
          create(:intake_speech_question, assessment: assessment, answer: 'car', correct_answer: 'incorrect', level: 0) # incorrect
        ]

        expect { IntakeAssessments::Speech::MoveToNextSpeechLevel.call(intake_assessment: assessment) }
          .to change { assessment.reload.speech_assessment_grade_level }.by(1)
      end
    end
  end
end
