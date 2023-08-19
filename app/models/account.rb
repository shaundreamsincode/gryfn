class Account < ApplicationRecord
  has_secure_password
  has_secure_token

  has_one :intake_assessmment
end
