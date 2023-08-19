# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_19_054413) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "token"
    t.string "name"
    t.string "email"
    t.integer "birth_year"
    t.string "country"
    t.string "zip_code"
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", force: :cascade do |t|
    t.text "body"
    t.text "slug"
  end

  create_table "foos", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "intake_assessments", force: :cascade do |t|
    t.string "token"
    t.bigint "account_id"
    t.string "level_of_education"
    t.boolean "previously_diagnosed"
    t.datetime "last_eye_exam_at"
    t.integer "current_question_index", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_intake_assessments_on_account_id"
  end

  create_table "intake_question_responses", force: :cascade do |t|
    t.string "token"
    t.bigint "intake_question_id"
    t.string "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_question_id"], name: "index_on_resp_and_question_id"
  end

  create_table "intake_questions", force: :cascade do |t|
    t.string "token"
    t.bigint "intake_assessment_id"
    t.integer "index", default: 0, null: false
    t.string "answer", null: false
    t.string "file_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_assessment_id"], name: "index_quest_on_assessment"
  end

  create_table "intake_survey_responses", force: :cascade do |t|
    t.string "token"
    t.bigint "intake_assessment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_assessment_id"], name: "index_intake_survey_responses_on_intake_assessment_id"
  end

  add_foreign_key "intake_assessments", "accounts"
end
