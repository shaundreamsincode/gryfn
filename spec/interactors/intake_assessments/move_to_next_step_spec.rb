require "rails_helper"

RSpec.describe IntakeAssessments::MoveToNextStep do
  describe "#call" do
    context "when the current step is speech" do
      it "moves the assessment to eidetic" do
        assessment = create(:intake_assessment, current_step: 'speech')

        IntakeAssessments::MoveToNextStep.call(assessment: assessment)
        expect(assessment.reload.current_step).to eq('eidetic')
      end
    end

    context "when the current step is eidetic" do
      it "moves the assessment to phonetic" do
        assessment = create(:intake_assessment, current_step: 'eidetic')

        IntakeAssessments::MoveToNextStep.call(assessment: assessment)
        expect(assessment.reload.current_step).to eq('phonetic')
      end
    end

    context "when the current step is phonetic" do
      it "moves the assessment to summary" do
        assessment = create(:intake_assessment, current_step: 'phonetic')

        IntakeAssessments::MoveToNextStep.call(assessment: assessment)
        expect(assessment.reload.current_step).to eq('summary')
      end
    end

    context "when the current step is summary" do
      it "doesn't change the current step" do
        assessment = create(:intake_assessment, current_step: 'summary')

        IntakeAssessments::MoveToNextStep.call(assessment: assessment)
        expect(assessment.reload.current_step).to eq('summary')
      end
    end
  end
end
