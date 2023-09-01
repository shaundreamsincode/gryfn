class IntakeAssessment < ApplicationRecord
  ASSESSMENT_TYPES = {
    desd: 'desd',
    adt: 'adt'
  }.freeze

  belongs_to :organization

  has_many :intake_speech_questions
  alias_attribute :speech_questions, :intake_speech_questions

  has_many :intake_eidetic_questions
  alias_attribute :eidetic_questions, :intake_eidetic_questions

  has_many :intake_phonetic_questions
  alias_attribute :phonetic_questions, :intake_phonetic_questions

  enum :assessment_type, { desd: 0, adt: 1 }
  enum current_step: { speech: 0, eidetic: 1, phonetic: 2, summary: 3 }

  def dataset
    desd? ? Data::Desd : Data::Adt
  end

  def words_by_level(level)
    desd? ? Data::Desd::WORDS_BY_LEVEL[level] : Data::Adt::WORDS_BY_LEVEL[level]
  end

  def level_count
    desd? ? Data::Desd::WORDS_BY_LEVEL.count : Data::Desd::WORDS_BY_LEVEL.count
  end

  def speech_assessment_grade_level_as_label
    return if speech_assessment_grade_level.nil?

    desd? ? Data::Desd::LEVEL_LABELS[speech_assessment_grade_level] :
      Data::Adt::LEVEL_LABELS[speech_assessment_grade_level]
  end

  def eidetic_assessment_level_as_label
    return if eidetic_assessment_level.nil?

    desd? ? Data::Desd::LEVEL_LABELS[eidetic_assessment_level] :
      Data::Adt::LEVEL_LABELS[eidetic_assessment_level]
  end

  def phonetic_assessment_level_as_label
    return if phonetic_assessment_level.nil?

    desd? ? Data::Desd::LEVEL_LABELS[phonetic_assessment_level] :
      Data::Adt::LEVEL_LABELS[phonetic_assessment_level]
  end
end
