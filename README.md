1. How to start
To start the app you need docker installed, then run "docker-compose up" from the root directory
Open http://localhost:3000/ and you will see login page
To log in use user1@gmail.com, pass1

2. Description
A client-server application based on Next.js, Nest.js, PostgreSQL and Docker providing weather forecast information for a list of cities from the Open Weather Map API service.

The application consists of a login page and a page with weather forecast cards for cities. Each card contains information about the current weather and forecast for the next three days. The cards display information about temperature and precipitation. Also, the user has the ability to delete cards and add new ones through the city search field.

Login page:
Authentication in the application is implemented through a combination of an e-mail address and a password. JWT tokens are used to implement the authentication mechanism.

Weather Forecast Page:
The page contains a set of cards that provide information about the weather forecast, as well as a field for searching and then adding cards with new cities. The selected set of cards is saved for each user on the server. The user has the ability to delete any cards and add up to 10 cards per page at the same time.
