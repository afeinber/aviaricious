class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :bird

  validates :bird, :user, presence: true
  validates :user, uniqueness: { scope: :bird }
end
