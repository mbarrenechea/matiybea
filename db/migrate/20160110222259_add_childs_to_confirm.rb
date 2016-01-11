class AddChildsToConfirm < ActiveRecord::Migration
  def up
    add_column :confirms, :childs, :text, array: true, default: []
  end
  def down
    remove_column :confirms, :childs
  end
end
