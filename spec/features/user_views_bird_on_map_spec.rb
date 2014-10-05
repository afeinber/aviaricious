require 'rails_helper'

feature 'user views bird observations of a species', js: true do
  scenario 'on the map' do
    visit '/'
    @user = create(:user)
    @user.stub(:longitude) { -74.0059 }
    @user.stub(:latitude) { 40.7127 }

    #useless user is just so we can have someone signed in on the backend
    @useless_user = create(:user)
    Devise::SessionsController.any_instance.stub(:create) do |controller|
      controller.sign_in(:user, @useless_user)
      controller.render(json: @user.to_json)
    end
    birds = create_list(:bird, 5)

    sign_in_as @user

    #sleep
    click_link 'Find a bird'
    click_link 'by common name'
    click_link birds.first.common_name
    click_link "Find on map"

    expect(page).to have_css("#map-canvas")
  end
end
