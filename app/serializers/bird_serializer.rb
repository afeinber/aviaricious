class BirdSerializer < ActiveModel::Serializer
  attributes :id, :common_name, :scientific_name, :photo_url, :song
end
