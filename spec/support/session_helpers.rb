module SessionHelpers
  def sign_in_as(user)
    visit '/'
    click_on 'Sign in'
    fill_in 'Enter email', with: user.email
    fill_in 'Enter password', with: user.password
    click_button 'Submit'
  end
end
