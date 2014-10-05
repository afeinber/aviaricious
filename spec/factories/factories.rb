# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bird do
    common_name { Faker::Name.first_name + Faker::Name.last_name }
    scientific_name { Faker::Name.last_name + Faker::Name.first_name }
    photo_url "http://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bobolink_%28F%29_02.jpg/220px-Bobolink_%28F%29_02.jpg"
  end
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
    sign_in_count 1
    current_sign_in_at "2014-09-14 00:47:52"
    last_sign_in_at "2014-09-14 00:47:52"
    current_sign_in_ip IPAddr.new("207.38.196.140")
    last_sign_in_ip IPAddr.new("207.38.196.140")
    latitude 40.7622
    longitude -73.9121

  end
end
