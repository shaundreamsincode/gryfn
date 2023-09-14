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

ActiveRecord::Schema[7.0].define(version: 2023_09_06_011547) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "token"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "badges", force: :cascade do |t|
    t.string "token"
    t.bigint "organization_id"
    t.bigint "account_id"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_badges_on_account_id"
    t.index ["organization_id"], name: "index_badges_on_organization_id"
  end

  create_table "deities", force: :cascade do |t|
    t.string "token"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "intake_assessments", force: :cascade do |t|
    t.string "token"
    t.bigint "organization_id"
    t.datetime "completed_at"
    t.string "patient_first_name", null: false
    t.string "email", null: false
    t.datetime "date_of_birth"
    t.string "country"
    t.string "zip_code"
    t.string "level_of_education"
    t.boolean "previously_diagnosed"
    t.integer "current_speech_question_index", default: 0, null: false
    t.integer "speech_assessment_grade_level"
    t.integer "speech_assessment_current_level", default: 0, null: false
    t.integer "current_step", default: 0, null: false
    t.integer "assessment_type", default: 0, null: false
    t.bigint "account_id"
    t.bigint "created_by_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_intake_assessments_on_account_id"
    t.index ["created_by_id"], name: "index_intake_assessments_on_created_by_id"
    t.index ["organization_id"], name: "index_intake_assessments_on_organization_id"
  end

  create_table "intake_eidetic_questions", force: :cascade do |t|
    t.string "token"
    t.integer "level", default: 0, null: false
    t.integer "index", default: 0, null: false
    t.bigint "intake_assessment_id"
    t.string "answer"
    t.string "correct_answer", null: false
    t.string "file_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_assessment_id"], name: "index_eidetic_quest_on_assessment_idx"
  end

  create_table "intake_phonetic_questions", force: :cascade do |t|
    t.string "token"
    t.integer "level", default: 0, null: false
    t.integer "index", default: 0, null: false
    t.bigint "intake_assessment_id"
    t.string "answer"
    t.string "correct_answer", null: false
    t.string "phonetic_sets"
    t.string "file_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_assessment_id"], name: "index_phonetic_quest_on_assessment_idx"
  end

  create_table "intake_speech_questions", force: :cascade do |t|
    t.string "token"
    t.integer "index", default: 0, null: false
    t.integer "level", default: 0, null: false
    t.bigint "intake_assessment_id"
    t.string "answer"
    t.string "correct_answer", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_assessment_id"], name: "index_intake_speech_questions_on_intake_assessment_id"
  end

  create_table "intake_summaries", force: :cascade do |t|
    t.bigint "intake_assessment_id"
    t.string "correct_speech_questions", default: [], array: true
    t.string "incorrect_speech_questions", default: [], array: true
    t.string "correct_eidetic_questions", default: [], array: true
    t.string "incorrect_eidetic_questions", default: [], array: true
    t.string "correct_phonetic_questions", default: [], array: true
    t.string "incorrect_phonetic_questions", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intake_assessment_id"], name: "index_intake_summaries_on_intake_assessment_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "token"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "badges", "accounts"
  add_foreign_key "badges", "organizations"
  add_foreign_key "intake_assessments", "accounts"
  add_foreign_key "intake_assessments", "accounts", column: "created_by_id"
  add_foreign_key "intake_assessments", "organizations"
  add_foreign_key "intake_speech_questions", "intake_assessments"
  add_foreign_key "intake_summaries", "intake_assessments"
end
