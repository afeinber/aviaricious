require 'rails_helper'

feature 'user views bird observations of a species', js: true do
  scenario 'on the map' do
    visit '/'

    sign_in_as create(:user)

    sleep 1
    click_link "Downy Woodpecker"
    expect(page).to have_css("#map-canvas")
  end
end
