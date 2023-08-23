class IntakeAssessment < ApplicationRecord
  belongs_to :organization
  has_many :intake_eidetic_questions
end
