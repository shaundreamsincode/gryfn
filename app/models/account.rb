class Account < ApplicationRecord
  has_secure_password

  has_one :intake_assessment
end
