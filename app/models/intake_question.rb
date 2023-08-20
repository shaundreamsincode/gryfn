class IntakeQuestion < ApplicationRecord
  belongs_to :intake_assessment

    FILE_NAMES =
      %w(
    parliament.mp3
    knapsack.mp3
    foreign.mp3
    litigious.mp3
    achieve.mp3)
end
