# spec/features/external_request_spec.rb
require 'rails_helper'
# require 'rspec/mocks'
# require 'rspec/mocks/spec_methods'
# require 'rspec/mocks/standalone'

feature 'Homepage shows nearby observations', js: true do
  scenario 'from one location' do
    user = create(:user)
    #to get the longitude and latitude we mock a user.
    Devise::SessionsController.any_instance.stub(:create) do |controller|
      controller.render(json: user.to_json)
    end
    visit '/'
    user = create(:user)
    sign_in_as user
    expect(page).to have_css(".observation")
  end
end
