# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bird do
    common_name { Faker::Name.first_name }
    scientific_name { Faker::Lorem.sentence }
  end
end