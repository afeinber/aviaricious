require 'rails_helper'

feature 'user signs up' do
  background do
    #set location
    visit '/'

    click 'Join'
    fill_in 'Enter email', with: 'test@test.test'
    fill_in 'password', with: 'KrispeeKreAm'

    click 'submit'

  end

  scenario 'successfully' do
    expect(page).to have_content "Congratulations! You've signed up successfully!"
  end

  scenario 'and logs out' do
    click 'logout'
    expect(page).to have_content 'Welcome to Aviaricous'
  end

  scenario 'and logs back in with same credentials' do
    click 'logout'
    click 'Sign in'

    expect(page).to have_content 'Recent observations in your area'
  end

end
