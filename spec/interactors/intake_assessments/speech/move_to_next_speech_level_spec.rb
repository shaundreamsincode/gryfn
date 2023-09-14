require "rails_helper"

RSpec.describe IntakeAssessments::Speech::MoveToNextSpeechLevel do
  describe "#call" do
    describe "desd" do
      it "moves the speech current level by 1" do
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        assessment = create(
          :intake_assessment, :desd,
          created_by: account,
          organization: organization,
          current_step: 'speech',
          speech_assessment_current_level: 0
        ) # todo - remove organization id?

        _speech_questions_level_0 = [
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'baby', level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'one', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', level: 0)
        ]

        IntakeAssessments::Speech::MoveToNextSpeechLevel.call(intake_assessment: assessment)
        assessment.reload
        expect(assessment.speech_assessment_current_level).to eq(1)
        expect(assessment.current_step).to eq('speech')
      end

      it "completes the assessment" do
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        assessment = create(
          :intake_assessment, :desd,
          created_by: account,
          organization: organization,
          current_step: 'speech',
          speech_assessment_current_level: 2
        )

        _speech_questions_level_0 = [
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'baby', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'one', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', level: 0)
        ]

        _speech_questions_level_1 = [
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'was', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'daddy', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'car',level: 1)
        ]

        _speech_questions_level_2 = [
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'girl', level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'apple', level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'they', level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'story', level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'some', level: 2)
        ]

        IntakeAssessments::Speech::MoveToNextSpeechLevel.call(intake_assessment: assessment)
        assessment.reload
        expect(assessment.current_step).to eq('eidetic')
      end

      it "completes the assessment (test case 2)" do
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        assessment = create(
          :intake_assessment, :desd,
          created_by: account,
          organization: organization,
          current_step: 'speech',
          speech_assessment_current_level: 3
        )

        _speech_questions_level_0 = [
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'baby', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'one', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', level: 0)
        ]

        _speech_questions_level_1 = [
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'was', level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'daddy', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'do', level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'car',level: 1)
        ]

        _speech_questions_level_2 = [
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'girl', level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'apple', level: 2),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'they', level: 2),
          create(:intake_speech_question, :correct, assessment: assessment, answer: 'story', level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'some', level: 2)
        ]

        _speech_questions_level_3 = [
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'above', level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'what', level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'any', level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'busy', level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'wait', level: 3)
        ]

        IntakeAssessments::Speech::MoveToNextSpeechLevel.call(intake_assessment: assessment)
        expect(assessment.reload.current_step).to eq('eidetic')
        expect(assessment.reload.speech_assessment_grade_level).to eq(2)
      end

      # context "when the assessment is at the last speech level and has a sufficient number of correct words" do
      #   context "and there are 5 questions wrong at or below the assessment's score" do
      #     it "completes the assessment" do
      #       organization = create(:organization)
      #       account = create(:account)
      #       _badge = create(:badge, account: account, organization: organization)
      #       assessment = create(
      #         :intake_assessment, :desd,
      #         created_by: account,
      #         organization: organization,
      #         current_step: 'speech',
      #         speech_assessment_current_level: 9
      #       )
      #
      #
      #       _speech_questions_level_7 = [
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'prairie', level: 8),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'gadget', level: 8),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'facsimile', level: 8),
      #         create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'emphasize', level: 8),
      #         create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'prescription', level: 8)
      #       ]
      #
      #       _speech_questions_level_8 = [
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'prairie', level: 8),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'gadget', level: 8),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'facsimile', level: 8),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'emphasize', level: 8),
      #         create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'prescription', level: 8)
      #       ]
      #
      #       _speech_questions_level_9 = [
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'zealous', level: 9),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'clique', level: 9),
      #         create(:intake_speech_question, :correct, assessment: assessment, answer: 'atrocious', level: 9),
      #         create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'catastrophe', level: 9),
      #         create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'liquidate', level: 9)
      #       ]
      #
      #       IntakeAssessments::Speech::MoveToNextSpeechLevel.call(intake_assessment: assessment)
      #       assessment.reload
      #       byebug
      #     end
      #   end
      # end
    end
  end
end
