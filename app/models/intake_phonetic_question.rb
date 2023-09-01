class IntakePhoneticQuestion < ApplicationRecord
  belongs_to :intake_assessment
  alias_attribute :assessment, :intake_assessment

  serialize :phonetic_sets, Array

  scope :answered, -> { where.not(answer: nil) }
  scope :unanswered, -> { where(answer: nil) }

  def is_correct?
    @_is_correct ||= IntakeAssessments::EvaluatePhoneticQuestion.call(question: self).correct
  end
end
