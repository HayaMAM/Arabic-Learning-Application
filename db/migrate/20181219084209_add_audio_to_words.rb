class AddAudioToWords < ActiveRecord::Migration[5.2]
  def change
    add_column :words, :audio, :string
  end
end
