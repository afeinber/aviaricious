require 'rails_helper'

feature 'user plays game', js: true do
  scenario 'and sees stats' do
    user = create(:user)
    create_list(:bird, 5)
    visit '/'
    sign_in_as user
    sleep 2
    click_link 'Game'
    wrong_count = 0
    10.times do
      find('.game-bird', match: :first).click
      #there is a delay after you click so you can see if you were right
      sleep 0.05
      # save_and_open_page
      if(page.has_xpath?("//span[contains(@style, 'background-color: red')]"))
        wrong_count += 1
      end
      sleep 1.5
    end
    final_score_percent = ((1 - (wrong_count / 10.0)) * 100).to_i
    expect(Score.last.percent).to equal(final_score_percent)
    expect(page).to have_css '.highcharts-container'
  end
end
