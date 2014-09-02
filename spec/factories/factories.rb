# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bird do
    common_name { Faker::Name.first_name }
    scientific_name { Faker::Name.last_name }
    photo_url "http://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bobolink_%28F%29_02.jpg/220px-Bobolink_%28F%29_02.jpg"
  end
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end
