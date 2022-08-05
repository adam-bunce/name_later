# Typing Test

## What Is It
A web-app that tracks user's typing speeds over time and 
displays the top typers of the day/all time on a leaderboard,
inspired by [10FastFingers](https://10fastfingers.com/typing-test/english), 
[TypeRacer](https://play.typeracer.com/) and [Monkeytype](https://monkeytype.com/)

## Video


https://user-images.githubusercontent.com/74341873/183215298-73e17e1b-f3d6-445a-bfab-74ad35787073.mp4



## Setup

- have node.js and MySQL installed
- clone repo
- install dependencies
  - in root run `npm install` to install server dependencies
  - run `cd frontend` then `npm install` to install frontend dependencies
- in root create a .env file with the following variables
  - `PORT` port to expose the server on
  - `SERVER_URL=http://localhost:PORT` address for frontend to send requests to
  - `DB_USER` user for the MySQL database
  - `DB_PASS` password for the MySQL database
  - `DB_URL` url of where the database is hosted (localhost)
  - `DB_NAME` name of database to use
  - `JWT_SECRET` secret key to verify JWT
- in frontend create a .env file containing `REACT_APP_SERVER_URL=SERVER_URL` where server url
 is the same as the url that is being used to host the server, these have been separated so
 frontend/backend can be deployed independently
- run `npm start server` from root and `npm start` from frontend
 
 
