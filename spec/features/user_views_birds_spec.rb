require 'rails_helper'

feature 'user views birds', js: true do

  it 'and searches for a bird' do
    birds = create_list(:bird, 30)
    last_bird_name = birds.last.common_name.delete(birds.last.common_name[0])
    puts Bird.last.common_name

    visit '/'
    click_link 'Find a bird'

    fill_in 'Find a bird', with: last_bird_name

    expect(page).to have_content(birds.last.common_name)

  end
end
