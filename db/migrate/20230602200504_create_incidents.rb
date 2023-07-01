class CreateIncidents < ActiveRecord::Migration[7.0]
  def change
    create_table :incidents do |t|
      t.text :title
      t.text :description
      t.text :severity
      t.text :creator_name
      t.text :channel_name # todo - make fields non-nilable
      t.text :incident_channel_name

      t.datetime :resolved_at
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
