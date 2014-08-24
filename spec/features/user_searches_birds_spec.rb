require 'rails_helper'

feature 'user searches birds', js: true do
  background do
    @birds = create_list(:bird, 30)
    @user = create(:user)
  end

  scenario 'by common name' do

    #i.e. search for 'ardinal' and expect to see 'Cardinal' on page
    last_bird_name = @birds.last.common_name.delete(@birds.last.common_name[0])

    visit '/'
    sign_in_as @user
    click_link 'Find a bird'
    click_link 'by common name'
    sleep 1

    fill_in 'Find a bird', with: last_bird_name

    expect(page).to have_content(@birds.last.common_name)

  end

  scenario 'by scientific name' do

    last_bird_name = @birds.last.scientific_name.delete(@birds.last.scientific_name[0])

    visit '/'

    sign_in_as @user
    click_link 'Find a bird'
    click_link 'by scientific name'

    sleep 1
    fill_in 'Find a bird', with: last_bird_name

    expect(page).to have_content(@birds.last.common_name)

  end
end
