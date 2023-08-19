class IntakeAssessment < ApplicationRecord
  belongs_to :account

  has_one :intake_survey_response
  has_many :intake_audio_questions
end
