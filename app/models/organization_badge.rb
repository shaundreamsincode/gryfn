class OrganizationBadge < ApplicationRecord
  belongs_to :organization
  belongs_to :badge
end
