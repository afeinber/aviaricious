class CreateBirds < ActiveRecord::Migration
  def change
    create_table :birds do |t|
      t.string :photo_url, null: false
      t.string :common_name, null: false, index: true
      t.string :scientific_name, null: false, index: true
    end
  end
end
