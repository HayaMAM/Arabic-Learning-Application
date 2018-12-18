class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string :term
      t.string :arabic_form
      t.string :english_form

      t.timestamps
    end
  end
end
