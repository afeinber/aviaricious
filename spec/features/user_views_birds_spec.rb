require 'rails_helper'

feature 'user views birds', js: true do
  scenario 'and there they are' do

    visit '/'
    click_link 'Find a bird'

    #expect(find('.bird')).to have_content('common name')
    expect(page).to have_css('.bird', text: 'common name')
  end

  scenario 'and searches for a bird' do
    visit '/'
    click_link 'Find a bird'
    fill_in 'Find a bird', with: 'Northern Card'
    within('.bird') do
      expect(page).to have_content('Northern Cardinal')
    end
  end
end
