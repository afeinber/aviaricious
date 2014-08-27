require 'rails_helper'

feature 'user views bird observations of a species', js: true do
  scenario 'on the map' do
    visit '/'

    sign_in_as create(:user)

    sleep 0.25
    # save_and_open_page
    within('.observation', match: :first) do

      find("a.bird-name").click
    end
    click_link "Find on map"
    expect(page).to have_css("#map-canvas")
  end
end
