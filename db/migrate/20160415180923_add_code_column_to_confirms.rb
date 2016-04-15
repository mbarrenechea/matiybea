class AddCodeColumnToConfirms < ActiveRecord::Migration
  def up
    add_column :confirms, :code, :string
  end
  def down
    remove_column :confirms, :code
  end
end