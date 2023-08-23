class IntakeAssessment < ApplicationRecord
  belongs_to :organization
  has_many :intake_spelling_questions
  enum current_step: { speech: 0, eidetic: 1, phonetic: 2 }
end
