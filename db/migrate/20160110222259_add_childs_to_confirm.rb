class AddChildsToConfirm < ActiveRecord::Migration
  def up
    add_column :confirms, :childs, :string, array: true
  end
  def down
    remove_column :confirms, :childs, :string
  end
end
