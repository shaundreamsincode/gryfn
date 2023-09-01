class IntakeSpeechQuestion < ApplicationRecord
  belongs_to :intake_assessment
  alias_attribute :assessment, :intake_assessment

  scope :answered, -> { where.not(answer: nil) }
  scope :unanswered, -> { where(answer: nil) }

  def is_correct?
    return false if answer.nil?
    answer.downcase == correct_answer.downcase
  end
end
