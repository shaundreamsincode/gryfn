require "rails_helper"

RSpec.describe IntakeAssessments::Speech::MoveToNextLevel do
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
        speech_current_level: 0
      ) # todo - remove organization id?

      _speech_questions_level_0 = [
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'baby', index: 0, level: 0),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'one', index: 1, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', index: 2, level: 0),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', index: 3, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', index: 4, level: 0)
      ]

      IntakeAssessments::Speech::MoveToNextLevel.call(assessment: assessment)
      assessment.reload
      expect(assessment.speech_current_level).to eq(1)
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
        speech_score: 1,
        speech_current_level: 2
      )

      _speech_questions_level_0 = [
        # 4 right
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'baby', index: 0, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'one', index: 1, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', index: 2, level: 0),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', index: 3, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', index: 4, level: 0)
      ]

      _speech_questions_level_1 = [
        # 3 right
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'was', index: 5, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'daddy', index: 6, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'book', index: 7, level: 1),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'good', index: 8, level: 1),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'doll', index: 9, level: 1)
      ]

      _speech_questions_level_2 = [
        # 0 right
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'girl', index: 10, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'apple', index: 11, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'they', index: 12, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'story', index: 13, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'some', index: 14, level: 2)
      ]

      IntakeAssessments::Speech::MoveToNextLevel.call(assessment: assessment)
      assessment.reload
      expect(assessment.current_step).to eq('eidetic')
      # right now, getting speech
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
        speech_current_level: 3
      )

      _speech_questions_level_0 = [
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'baby', index: 0, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'one', index: 1, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'boat', index: 2, level: 0),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', index: 3, level: 0),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', index: 4, level: 0)
      ]

      _speech_questions_level_1 = [
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'was', index: 5, level: 1),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'daddy', index: 6, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'book', index: 7, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'good', index: 8, level: 1),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'doll', index: 9,level: 1)
      ]

      _speech_questions_level_2 = [
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'girl', index: 10, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'apple', index: 11, level: 2),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'they', index: 12, level: 2),
        create(:intake_speech_question, :correct, assessment: assessment, answer: 'story', index: 13, level: 2),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'some', index: 14, level: 2)
      ]

      _speech_questions_level_3 = [
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'above', index: 15, level: 3),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'what', index: 16, level: 3),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'any', index: 17, level: 3),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'busy', index: 18, level: 3),
        create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'wait', index: 19, level: 3)
      ]

      IntakeAssessments::Speech::MoveToNextLevel.call(assessment: assessment)
      expect(assessment.reload.current_step).to eq('eidetic')

      eidetic_questions = IntakeEideticQuestion.all
      expect(eidetic_questions.sort_by(&:index).pluck(:correct_answer)).to eq(%w(story they girl doll good))
    end

    context "when all 5 questions on the first level are wrong" do
      it "fails the exam" do
        organization = create(:organization)
        account = create(:account)
        _badge = create(:badge, account: account, organization: organization)
        assessment = create(
          :intake_assessment, :desd,
          created_by: account,
          organization: organization,
          current_step: 'speech',
          speech_current_level: 0
        )

        _speech_questions_level_0 = [
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'baby', index: 0, level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'one', index: 1, level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'boat', index: 2, level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'do', index: 3, level: 0),
          create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'car', index: 4, level: 0)
        ]

        IntakeAssessments::Speech::MoveToNextLevel.call(assessment: assessment)
        assessment.reload
        expect(assessment.current_step).to eq('fail_insufficient_correct')
      end
    end

    # it "fails when there are an insufficient number of correct questions" do
    #   organization = create(:organization)
    #   account = create(:account)
    #   _badge = create(:badge, account: account, organization: organization)
    #   assessment = create(
    #     :intake_assessment, :desd,
    #     created_by: account,
    #     organization: organization,
    #     current_step: 'speech',
    #     speech_current_level: 1
    #   )
    #
    #   _speech_questions_level_0 = [
    #     create(:intake_speech_question, :correct, assessment: assessment, answer: 'baby', index: 0, level: 0),
    #     create(:intake_speech_question, :correct, assessment: assessment, answer: 'one', index: 1, level: 0),
    #     create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'boat', index: 2, level: 0),
    #     create(:intake_speech_question, :correct, assessment: assessment, answer: 'do', index: 3, level: 0),
    #     create(:intake_speech_question, :correct, assessment: assessment, answer: 'car', index: 4, level: 0)
    #   ]
    #
    #   _speech_questions_level_1 = [
    #     create(:intake_speech_question, :correct, assessment: assessment, answer: 'was', index: 5, level: 1),
    #     create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'daddy', index: 6, level: 1),
    #     create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'book', index: 7, level: 1),
    #     create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'good', index: 8, level: 1),
    #     create(:intake_speech_question, :incorrect, assessment: assessment, answer: 'doll', index: 9,level: 1)
    #   ]
    #
    #   IntakeAssessments::Speech::MoveToNextLevel.call(assessment: assessment)
    #   expect(assessment.reload.current_step).to eq('fail_insufficient_correct')
    #   expect(assessment.reload.speech_score).to eq(0)
    # end

  end
end
