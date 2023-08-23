class IntakeSpellingQuestion < ApplicationRecord
  belongs_to :intake_assessment

  PHONETIC_SET_DICTIONARY = {
    'baby' => [['b','eɪ','b','i']],
    'one' => [['w','ʌ','n']],
    'boat' => [['b','oʊ','t']],
    'do' => [['d','u']],
    'car' => [['k','ɑ','r']],
    'was' => [['w','ʌ','z']],
    'daddy' => [['d','æ','dd','i'], ['d','æ','dd','i']],
    'book' => [['b','ʌ','k']],
    'good' => [['g','ʌ','d']],
    'what' => [['w','ʌ','t']]
  }.with_indifferent_access.freeze


  def self.create_questions_for_assessment!(assessment)
    PHONETIC_SET_DICTIONARY.each do |answer, valid_phonetics|
      create!(intake_assessment: assessment, correct_answer: answer, valid_phonetics: valid_phonetics, file_name: "#{answer}.mp3")
    end
  end

    # FILE_NAMES =
    #   %w(
    # what.mp3
    # knapsack.mp3
    # foreign.mp3
    # litigious.mp3
    # triptych.mp3
    # execrable.mp3
    # islet.mp3
    # ).freeze
end
