class AddCollectionIdToWords < ActiveRecord::Migration[5.2]
  def change
    add_column :words, :collection_id, :integer
  end
end
