class IntakeAssessment < ApplicationRecord
  belongs_to :organization
  has_many :intake_questions
end
