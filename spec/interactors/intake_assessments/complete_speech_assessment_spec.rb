require "rails_helper"

RSpec.describe IntakeAssessments::CompleteSpeechAssessment do
  describe "#call" do
    context "when the assessment type is DESD" do
      it "calculates the grade correctly, moves the assessment to eidetic, and creates eidetic & phonetic questions" do
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

        expect {
          IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment)
        }.to change { assessment.reload.current_step }.from('speech').to('eidetic')

        expect(assessment.reload.speech_assessment_grade_level).to eq(1)

        expect(assessment).to have_attributes(
                                       speech_assessment_grade_level: 1,
                                       eidetic_assessment_level: 2,
                                       phonetic_assessment_level: 3
                                     )

        expect(IntakeEideticQuestion.count).to eq(5)
        expect(IntakeEideticQuestion.pluck(:level).uniq).to eq([2])
        expect(IntakeEideticQuestion.pluck(:correct_answer).sort).to eq(%w[apple girl some story they])

        expect(IntakePhoneticQuestion.count).to eq(5)
        expect(IntakePhoneticQuestion.pluck(:level).uniq).to eq([3])
        expect(IntakePhoneticQuestion.pluck(:correct_answer).sort).to eq(%w[above any busy night what])

      end
    end

    context "when the assessment type is ADT" do
      it "calculates the grade correctly, moves the assessment to eidetic, and creates eidetic & phonetic questions" do
        assessment = create(:intake_assessment, :adt)

        _correct_speech_questions = [
          create(:intake_speech_question, :correct, assessment: assessment, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, level: 0),
          create(:intake_speech_question, :correct, assessment: assessment, level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, level: 1),
          create(:intake_speech_question, :correct, assessment: assessment, level: 2),
          create(:intake_speech_question, :correct, assessment: assessment, level: 2),
        ]

        _incorrect_speech_questions = [
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 1),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 2),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 3),
          create(:intake_speech_question, :incorrect, assessment: assessment, level: 3)
        ]

        expect {
          IntakeAssessments::CompleteSpeechAssessment.call(assessment: assessment)
        }.to change { assessment.reload.current_step }.from('speech').to('eidetic')

        expect(assessment).to have_attributes(
                                       speech_assessment_grade_level: 1,
                                       eidetic_assessment_level: 2,
                                       phonetic_assessment_level: 3,
                                     )

        expect(IntakeEideticQuestion.count).to eq(7)
        expect(IntakeEideticQuestion.pluck(:level).uniq).to eq([2])

        expect(IntakeEideticQuestion.pluck(:correct_answer).sort)
          .to eq(%w[believe business calf enough heavy laugh meadow])

        expect(IntakePhoneticQuestion.count).to eq(7)
        expect(IntakePhoneticQuestion.pluck(:level).uniq).to eq([3])

        expect(IntakePhoneticQuestion.pluck(:correct_answer).sort)
          .to eq(%w[decorate delight familiar glisten league rough spectacles])
      end
    end
  end
end
