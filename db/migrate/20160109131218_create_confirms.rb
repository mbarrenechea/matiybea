class CreateConfirms < ActiveRecord::Migration
  def change
    create_table :confirms do |t|
      t.string :name
      t.string :companion
      t.string :childs, array: true, default: []
      t.text :allergic
      t.text :comment

      t.timestamps null: false
    end
  end
end
