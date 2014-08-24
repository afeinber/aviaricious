require 'rails_helper'

feature 'user signs up', js: true do
  background do
    #set location
    visit '/'

    click_on 'Join'
    fill_in 'Enter email', with: 'test@test.test'
    fill_in 'Enter password', with: 'password'

    click_on 'submit'

  end

  scenario 'successfully' do
    expect(page).to have_content "Congratulations! You've signed up successfully!"
  end

  scenario 'and logs out' do
    click_on 'logout'
    expect(page).to have_content 'Welcome to Aviaricous'
  end

end
