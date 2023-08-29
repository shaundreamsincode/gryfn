class IntakeSpeechQuestion < ApplicationRecord
  belongs_to :intake_assessment

  FILE_NAMES =
    %w(
    what.mp3
    ).freeze

  def is_correct?
    return false if answer.nil?
    answer.downcase == correct_answer.downcase
  end
end
