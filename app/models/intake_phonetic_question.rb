class IntakePhoneticQuestion < ApplicationRecord
  belongs_to :intake_assessment
  alias_attribute :assessment, :intake_assessment

  serialize :phonetic_sets, Array

  def is_correct?
    @_is_correct ||= IntakeAssessments::EvaluatePhoneticQuestion.call(question: self).correct
  end
end
