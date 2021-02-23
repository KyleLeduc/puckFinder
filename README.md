# PuckFinder
A service designed to cut down on the amount of time it takes to find an active game of shinny hockey on local outdoor rinks.

## Languages Used
*Created as part of the Web Developers Bootcamp 2.0 course's final project.*
- Written in NodeJS, using Express and EJS to deliver content.
- Bootstrap is used for the front end styling.  
- The database uses MongoDB.  
- Express is used to handle routing, routes follow a RESTful naming convention for CRUD functionality.

## Improvements
Once I completed the course, there are a number of additions I've made to further develop the app
- Created the check in service to allow users to view rink activity
- Finished styling the mobile version
- Added a navigation link powered by Google Maps to help users find the rink
- Patched a security vulnerability that exposed a users email address when they left a review
- Added more image scaling API requests to improve mobile load times and data usage
- Added a user location button and styled the cluster map
- Created a default image for when rinks don't have images