class IntakePhoneticQuestion < ApplicationRecord
  belongs_to :intake_assessment

  EXAMPLE_PHONETIC_SETS_DICTIONARY = {
    'baby' => [['b','eɪ','b','i']],
    'one' => [['w','ʌ','n']],
    'boat' => [['b','oʊ','t']],
    'do' => [['d','u']],
    'car' => [['k','ɑ','r']]
  }.with_indifferent_access.freeze

  def self.create_questions_for_assessment!(intake_assessment)
    EXAMPLE_PHONETIC_SETS_DICTIONARY.each do |answer, phonetic_sets|
      create!(
        intake_assessment: intake_assessment,
        correct_answer: answer,
        phonetic_sets: phonetic_sets,
        file_name: "#{answer}.mp3"
      )
    end
  end
end
