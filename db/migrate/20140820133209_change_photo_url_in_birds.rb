class ChangePhotoUrlInBirds < ActiveRecord::Migration
  def change
    change_column :birds, :photo_url, :string, null: true
  end
end
