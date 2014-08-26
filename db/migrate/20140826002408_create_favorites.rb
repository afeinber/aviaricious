class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.references :bird, null: false, index: true
      t.references :user, null: false, index: true
    end
  end
end
