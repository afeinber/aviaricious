require 'rails_helper'

feature 'user favorites birds', js: true do

  #note that this scope will sometimes work and sometimes not
  scenario 'and sees them' do
    birds = create_list(:bird, 2)
    fav_bird = birds[0]
    unfav_bird = birds[1]
    sign_in_as create(:user)
    click_on 'Find a bird'
    click_on 'by common name'
    click_on fav_bird.common_name
    sleep 1
    find('#fav-heart').click
    sleep 1
    click_on 'Favorites'
    expect(page).to have_content(fav_bird.common_name)
    expect(page).to have_no_content(unfav_bird.common_name)
  end

end
