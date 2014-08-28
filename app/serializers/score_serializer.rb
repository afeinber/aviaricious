class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :percent, :createdAt

  #get javascript timestamp format
  def createdAt
    object.created_at.to_i * 1000
  end
end
