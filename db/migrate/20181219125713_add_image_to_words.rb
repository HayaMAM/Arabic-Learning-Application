class AddImageToWords < ActiveRecord::Migration[5.2]
  def change
    add_column :words, :image, :string
  end
end
