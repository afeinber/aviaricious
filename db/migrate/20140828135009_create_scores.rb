class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.references :user, index: true, null: false
      t.integer :percent, null: false
      t.timestamps
    end
  end
end
