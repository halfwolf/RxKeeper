class CreatePrescriptions < ActiveRecord::Migration
  def change
    create_table :prescriptions do |t|
      t.integer :user_id, null: false
      
      t.decimal :right_sph, null: false, precision: 4, scale: 2
      t.decimal :right_cyl, null: false, precision: 4, scale: 2
      t.integer :right_axis, null: false
      t.decimal :right_bc, precision: 2, scale: 1
      t.decimal :right_diam, precision: 3, scale: 1
      
      t.decimal :left_sph, null: false, precision: 4, scale: 2
      t.decimal :left_cyl, null: false, precision: 4, scale: 2
      t.integer :left_axis, null: false
      t.decimal :left_bc, precision: 2, scale: 1
      t.decimal :left_diam, precision: 3, scale: 1
      
      t.boolean :contacts, default: false
      
      t.timestamps
    end
  end
end
