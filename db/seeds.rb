# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

OnboardOrganization.call(
  organization_name: "Corinne's Org",
  account_first_name: 'Corinne',
  account_last_name: 'Carland',
  account_email: 'corinne@gmail.com',
  account_password: 'passworded',
  account_password_confirmation: 'passworded'
)

OnboardOrganization.call(
  organization_name: "Edo's Org",
  account_first_name: 'Edo',
  account_last_name: 'Idk',
  account_email: 'edo@gmail.com',
  account_password: 'passworded',
  account_password_confirmation: 'passworded'
)


OnboardOrganization.call(
  organization_name: "Gryff's Org",
  account_first_name: 'Gryff',
  account_last_name: 'Idk',
  account_email: 'gryff@gmail.com',
  account_password: 'passworded',
  account_password_confirmation: 'passworded'
)

OnboardOrganization.call(
  organization_name: "Shaun's Org",
  account_first_name: 'Shaun',
  account_last_name: 'Carland',
  account_email: 'shaun@gmail.com',
  account_password: 'passworded',
  account_password_confirmation: 'passworded'
)
