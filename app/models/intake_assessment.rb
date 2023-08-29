class IntakeAssessment < ApplicationRecord
  belongs_to :organization

  has_many :intake_speech_questions
  alias_attribute :speech_questions, :intake_speech_questions

  has_many :intake_eidetic_questions
  alias_attribute :eidetic_questions, :intake_eidetic_questions

  has_many :intake_phonetic_questions
  alias_attribute :phonetic_questions, :intake_phonetic_questions

  enum current_step: { speech: 0, eidetic: 1, phonetic: 2, summary: 3 }
end
