class Incident < ApplicationRecord
  enum :status, { open: 0, resolved: 1 }
  # todo - make severity an enum as well (?)
end
