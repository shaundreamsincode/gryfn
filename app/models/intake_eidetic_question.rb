class IntakeEideticQuestion < ApplicationRecord
  belongs_to :intake_assessment

    FILE_NAMES =
      %w(
    what.mp3
    knapsack.mp3
    foreign.mp3
    litigious.mp3
    triptych.mp3
    execrable.mp3
    islet.mp3
    ).freeze
end
