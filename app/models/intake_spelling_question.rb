class IntakeSpellingQuestion < ApplicationRecord
  belongs_to :intake_assessment
  enum question_type: { eidetic: 0, phonetic: 1 }

  EXAMPLE_PHONETIC_SET_DICTIONARY = {
    'baby' => [['b','eɪ','b','i']],
    'one' => [['w','ʌ','n']],
    'boat' => [['b','oʊ','t']],
    'do' => [['d','u']],
    'car' => [['k','ɑ','r']]
  }.with_indifferent_access.freeze

  EXAMPLE_EIDETIC_SET_DICTIONARY = {
    'baby' => [['b','eɪ','b','i']],
    'one' => [['w','ʌ','n']],
    'boat' => [['b','oʊ','t']],
    'do' => [['d','u']],
    'car' => [['k','ɑ','r']],
  }.with_indifferent_access.freeze

  def self.create_questions_for_assessment!(assessment)
    EXAMPLE_PHONETIC_SET_DICTIONARY.each do |answer, valid_phonetics|
      create!(
        intake_assessment: assessment,
        correct_answer: answer,
        valid_phonetics: valid_phonetics,
        file_name: "#{answer}.mp3",
        question_type: :phonetic
      )
    end

    EXAMPLE_EIDETIC_SET_DICTIONARY.each do |answer, valid_phonetics|
      create!(
        intake_assessment: assessment,
        correct_answer: answer,
        valid_phonetics: valid_phonetics,
        file_name: "#{answer}.mp3",
        question_type: :eidetic
      )
    end
  end
end
