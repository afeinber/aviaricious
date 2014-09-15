class Bird < ActiveRecord::Base
  has_many :favorites, dependent: :destroy
  validates :scientific_name, :common_name, uniqueness: :true

  def self.search(query, name)
    if name == 'scientific'
      Bird.where('scientific_name ILIKE %?%', query)
    elsif name == 'common'
      Bird.where('common_name ILIKE %?%', query)
    end
  end

  def to_param
    self.scientific_name
  end
end

