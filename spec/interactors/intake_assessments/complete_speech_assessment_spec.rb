require "rails_helper"

RSpec.describe IntakeAssessments::CompleteSpeechAssessment do
  describe "#call" do
    it "moves the assessment to eidetic" do
      assessment = create(:intake_assessment)

      expect {
        IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment)
      }.to change { assessment.reload.current_step }.from('speech').to('eidetic')
    end

    context "when the assessment type is DESD" do
      it "calculates the grade correctly and creates eidetic and phonetic questions" do
        assessment = create(:intake_assessment, :desd)

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

        IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment)

        # Grade is the highest level where the patient read 3 out of 5 words correctly
        expect(assessment.reload.speech_assessment_grade_level).to eq(1)

        expect(assessment.reload).to have_attributes(
                                       speech_assessment_grade_level: 1, # Speech grade is the highest level where the patient read 3 out of 5 words correctly
                                       eidetic_assessment_level: 2,
                                       phonetic_assessment_level: 3
                                     )

        expect(IntakeEideticQuestion.count).to eq(5)
        expect(IntakeEideticQuestion.pluck(:level).uniq).to eq([2])
        expect(IntakeEideticQuestion.pluck(:correct_answer).sort).to eq(["apple", "girl", "some", "story", "they"])

        # level for phonetic
        expect(IntakePhoneticQuestion.count).to eq(5)
        expect(IntakePhoneticQuestion.pluck(:level).uniq).to eq([3])
        expect(IntakePhoneticQuestion.pluck(:correct_answer).sort).to eq( ["above", "any", "busy", "night", "what"])

      end
    end

    context "when the assessment type is ADT" do
      it "calculates the grade correctly and creates eidetic and phonetic questions" do
        assessment = create(:intake_assessment, :adt)

        # todo - spec for when it's uneven (e.g. 6, 5 maybe)
        correct_speech_questions = [
          create(:intake_speech_question, :correct, assessment: assessment, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, level: 2),
          create(:intake_speech_question, :correct, assessment: assessment, level: 2),
        ]

        incorrect_speech_questions = [
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 3)
        ]

        speech_questions = [correct_speech_questions, incorrect_speech_questions].flatten
        IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment.reload) # todo remove .reload?


        expect(assessment.reload).to have_attributes(
                                       speech_assessment_grade_level: 1, # Speech grade is the highest level where the patient read 3 out of 5 words correctly
                                       eidetic_assessment_level: 2,
                                       phonetic_assessment_level: 3
                                     )

        expect(IntakeEideticQuestion.count).to eq(7)
        expect(IntakeEideticQuestion.pluck(:level).uniq).to eq([2])

        expect(IntakeEideticQuestion.pluck(:correct_answer).sort)
          .to eq( ["believe", "business", "calf", "enough", "heavy", "laugh", "meadow"])

        # level for phonetic
        expect(IntakePhoneticQuestion.count).to eq(7)
        expect(IntakePhoneticQuestion.pluck(:level).uniq).to eq([3])

        expect(IntakePhoneticQuestion.pluck(:correct_answer).sort)
          .to eq(["decorate", "delight", "familiar", "glisten", "league", "rough", "spectacles"])
      end
    end
  end
end
