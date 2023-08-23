class IntakeAssessment < ApplicationRecord
  belongs_to :organization

  has_many :intake_spelling_questions
  alias_attribute :spelling_questions, :intake_spelling_questions

  has_many :intake_speech_questions
  alias_attribute :speech_questions, :intake_speech_questions

  enum current_step: { speech: 0, eidetic: 1, phonetic: 2 }
end
