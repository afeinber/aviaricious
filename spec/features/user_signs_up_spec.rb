require 'rails_helper'

feature 'user signs up', js: true do
  background do
    #set location
    visit '/'

    #Do this because of angular devise
    sleep 0.25

    click_on 'Join'
    fill_in 'Enter email', with: 'test@test.test'
    fill_in 'Enter password', with: 'password'

    click_on 'Submit'

  end

  scenario 'successfully' do
    expect(page).to have_content "Congratulations! You've signed up successfully!"
  end

  scenario 'and logs out' do
    click_on 'Logout'
    expect(page).to have_content 'Welcome to Aviaricious'
  end

end
