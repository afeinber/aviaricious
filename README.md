# My awesome aviaricious app

  [Aviaricious on Heroku](http://aviaricious.herokuapp.com)

---

##Features

* On 'dashboard' users can view the most recent observations in their area, determined by IP address.
* They can also search for birds in the database.
* They can look at birds' individually and see a larger image and play the bird's song and favorite the birds
* They can play a game where they guess the bird based on the song that they hear. At the end of ten rounds they will see a chart of their progress over time.

---

## Technologies

I used the following technologies and API's for my app:

* Rails as a backend (essentially a JSON API)
* AngularJS
* PostgeSQL
* Highcharts
* Rspec and Capybara for feature tests
* Ebird API which provides bird observations
* Google Maps API
* Xeno-canto for songs

---

## Issues

* Sometimes the sidebar will display on the landing page, which I don't want it to. (Just refresh for the full Aviaricious experience)
* In the game I crop the images, and a lot of the time it crops them badly (I need to find my own images and preprocess them, if I were to put this into real production)


