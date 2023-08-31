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

ActiveRecord::Schema[7.0].define(version: 2023_08_29_045935) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.bigint "organization_id"
    t.string "patient_first_name"
    t.string "email"
    t.integer "birth_year"
    t.string "country"
    t.string "zip_code"
    t.string "level_of_education"
    t.boolean "previously_diagnosed"
    t.integer "speech_assessment_grade_level"
    t.integer "speech_assessment_current_level"
    t.string "speech_assessment_correct_words", default: [], null: false, array: true
    t.string "speech_assessment_incorrect_words", default: [], null: false, array: true
    t.integer "current_step", default: 0, null: false
    t.integer "assessment_type", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_intake_assessments_on_organization_id"
  end

  create_table "intake_eidetic_questions", force: :cascade do |t|
    t.string "token"
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

  add_foreign_key "intake_assessments", "organizations"
  add_foreign_key "intake_speech_questions", "intake_assessments"
  add_foreign_key "intake_summaries", "intake_assessments"
end
