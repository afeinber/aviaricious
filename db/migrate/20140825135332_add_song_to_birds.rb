class AddSongToBirds < ActiveRecord::Migration
  def change
    add_column :birds, :song, :string
  end
end
