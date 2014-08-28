class Score < ActiveRecord::Base
  validates :percent, presence: true
  validates :user, presence: true

  belongs_to :user
end
