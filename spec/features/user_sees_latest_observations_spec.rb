# spec/features/external_request_spec.rb
require 'rails_helper'

feature 'Homepage shows nearby observations', js: true do
  scenario 'from one location' do

    #set geolocation = newton
    visit '/'
    sign_in_as create(:user)
    expect(page).to have_content("Downy Woodpecker")
  end

  scenario 'from a different location' do
    #set geolocation
    # http://ebird.org/ws1.1/data/obs/geo/recent?lng=-76.51&lat=42.46&fmt=json
    visit '/'
    sign_is_as create(:user)
    expect(page).to have_content("American Crow")
  end
end
