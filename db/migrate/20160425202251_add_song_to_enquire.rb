class AddSongToEnquire < ActiveRecord::Migration
  def up
    add_column :enquires, :song, :string
  end
  def down
    remove_column :enquires, :song
  end
end
