require 'rails_helper'

feature 'user plays game', js: true do
  scenario 'and sees stats' do
    user = create(:user)
    create_list(:bird, 5)
    visit '/'
    sign_in_as user
    sleep 2
    click_link 'Game'
    save_and_open_page
    10.times do
      find('.game-bird', match: :first).click
      #there is a delay after you click so you can see if you were right
      sleep 2
    end
    expect(page).to have_css '.highcharts-container'
  end
end
