class IntakeAssessment < ApplicationRecord
  belongs_to :organization

  has_many :intake_speech_questions
  has_many :intake_eidetic_questions
end
