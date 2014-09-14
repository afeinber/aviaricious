require 'rails_helper'

feature 'user views bird observations of a species', js: true do
  scenario 'on the map' do
    visit '/'
    @user = create(:user)
    #useless user is just so we can have someone signed in on the backend
    @useless_user = create(:user)
    Devise::SessionsController.any_instance.stub(:create) do |controller|
      controller.sign_in(:user, @useless_user)
      controller.render(json: @user.to_json)
    end

    sign_in_as @user
    sleep 2.0
    # save_and_open_page
    within('.observation', match: :first) do

      find("a.bird-name").click
    end
    click_link "Find on map"
    expect(page).to have_css("#map-canvas")
  end
end
