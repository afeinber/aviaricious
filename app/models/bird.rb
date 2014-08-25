# == Schema Information
#
# Table name: birds
#
#  id              :integer          not null, primary key
#  photo_url       :string(255)
#  common_name     :string(255)      not null
#  scientific_name :string(255)      not null
#

class Bird < ActiveRecord::Base

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

