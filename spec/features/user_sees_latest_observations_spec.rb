# spec/features/external_request_spec.rb
require 'rails_helper'

feature 'Homepage shows nearby observations', js: true do
  scenario 'from one location' do
    visit '/'
    user = create(:user)
    sign_in_as user
    expect(page).to have_css(".observation")
  end
end
