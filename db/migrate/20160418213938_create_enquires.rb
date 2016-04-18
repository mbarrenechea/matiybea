class CreateEnquires < ActiveRecord::Migration
  def change
    create_table :enquires do |t|
      t.string :name
      t.integer :score

      t.timestamps null: false
    end
  end
end
