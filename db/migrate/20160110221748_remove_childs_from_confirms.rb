class RemoveChildsFromConfirms < ActiveRecord::Migration
  def change
    remove_column :confirms, :childs, :string
  end
end
