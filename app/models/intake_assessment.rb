class IntakeAssessment < ApplicationRecord
  ASSESSMENT_TYPES = {
    desd: 'desd',
    adt: 'adt'
  }.freeze

  # TODO - check relation between these (org and account)
  belongs_to :organization
  belongs_to :created_by, foreign_key: :created_by_id, class_name: 'Account'

  has_many :intake_speech_questions
  alias_attribute :speech_questions, :intake_speech_questions

  has_many :intake_eidetic_questions
  alias_attribute :eidetic_questions, :intake_eidetic_questions

  has_many :intake_phonetic_questions
  alias_attribute :phonetic_questions, :intake_phonetic_questions

  enum :assessment_type, { desd: 0, adt: 1 }

  scope :current_step_speech, ->() { where(current_step: 'speech') }
  scope :current_step_eidetic, ->() { where(current_step: 'eidetic') }
  scope :current_step_phonetic, ->() { where(current_step: 'phonetic') }
  scope :current_step_summary, ->() { where(current_step: 'summary') }
  scope :current_step_failure, ->() {
    where(current_step: ['fail_insufficient_correct', 'fail_insufficient_incorrect'])
  }

  enum current_step: {
    speech: 0,
    eidetic: 1,
    phonetic: 2,
    summary: 3,
    fail_insufficient_correct: 4,
    fail_insufficient_incorrect: 5
  }

  def hashify
    {
      token: self.token,
      first_name: self.patient_first_name, # todo - either rename this to first_name or rename email to patient email, dob to patient dob, etc
      email: self.email,
      status: self.completed_at ? 'completed': 'pending',
      current_step: self.current_step
    }.with_indifferent_access
  end

  def speech_questions_answered_on_current_level
    speech_questions.answered_on_level(speech_assessment_current_level)
  end

  def current_speech_question
    speech_questions[current_speech_question_index]
  end

  def dataset
    desd? ? Data::Desd : Data::Adt
  end

  def words_by_level(level)
    desd? ? Data::Desd::WORDS_BY_LEVEL[level] : Data::Adt::WORDS_BY_LEVEL[level]
  end

  def level_count
    desd? ? Data::Desd::WORDS_BY_LEVEL.count : Data::Desd::WORDS_BY_LEVEL.count
  end

  def required_correct_speech_questions_count
    desd? ? 3 : 4 # todo - put these in dataset
  end

  def required_incorrect_speech_questions_count
    desd? ? 2 : 3 # todo - put these in dataset
  end

  def correct_speech_questions
    speech_questions.answered.select { |question| question.is_correct? }
  end

  def incorrect_speech_questions
    speech_questions.answered.reject { |question| question.is_correct? }
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
