class IntakeEideticQuestion < ApplicationRecord
  belongs_to :intake_assessment
  alias_attribute :assessment, :intake_assessment

  scope :answered, -> { where.not(answer: nil) }
  scope :unanswered, -> { where(answer: nil) }

  def self.create_questions_for_assessment!(assessment)
    WORDS.each do |word|
      create!(
        intake_assessment: assessment,
        correct_answer: word,
        file_name: "#{word}.mp3"
      )
    end
  end

  def is_correct?
    return false if answer.nil?
    answer.downcase == correct_answer.downcase
  end
end
