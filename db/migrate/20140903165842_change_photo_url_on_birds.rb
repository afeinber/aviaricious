class ChangePhotoUrlOnBirds < ActiveRecord::Migration
  def up
    change_column :birds, :photo_url, :text
  end

  def down
    change_column :birds, :photo_url, :string
  end
end
