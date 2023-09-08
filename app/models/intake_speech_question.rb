class IntakeSpeechQuestion < ApplicationRecord
  belongs_to :intake_assessment
  alias_attribute :assessment, :intake_assessment

  scope :answered_on_level, -> (level) {answered.where(level: level)}

  scope :answered, -> { where.not(answer: nil) }
  scope :unanswered, -> { where(answer: nil) }

  def is_correct?
    return false if answer.nil?
    answer.downcase == correct_answer.downcase
  end

  def hashify
    {
      token: token,
      answer: answer,
      correct_answer: correct_answer,
      assessment_token: intake_assessment.token,
      answer_viewable: intake_assessment.email == 'test@gryfn.ai'
    }
  end
end
