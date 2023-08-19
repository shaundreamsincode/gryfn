class IntakeAssessment < ApplicationRecord
  belongs_to :account

  has_many :intake_questions
end
