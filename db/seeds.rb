# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

OnboardOrganization.call(
  organization_name: 'ACME corp',
  account_first_name: 'Corinne',
  account_last_name: 'Carland',
  account_email: 'corinne@gmail.com',
  account_password: 'password',
  account_password_confirmation: 'password'
)
