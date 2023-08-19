class Assessment < ApplicationRecord
  belongs_to :account

  has_one :survey_question_response
  has_many :audio_questions
end
