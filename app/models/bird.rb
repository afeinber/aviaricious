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

end
