# Why ?

The main reason for this project is to learn more about full stack web development. As a side effect, it may also be used as a minimal version of roll20. I like roll20 but sometimes it feels way too heavy for a quick rpg game with friends, so I thought the world needed a more lightweight version of it.

# What ?

This is a web application allowing multiple users to join in a private virtual room, roll some dices, draw ugly battlemaps and move tokens on it so that they can enjoy a roleplaying game online.

# Technical stack :

![End-to-end tests](https://github.com/gmrdn/rpgbattlemap/workflows/End-to-end%20tests/badge.svg?branch=master)

- **MongoDB** for the database, hosted in atlas
- **Express** for the API
- **Nodejs** for the back end environment
- **React** for the front end, using classes and functional components (with hooks) when needed.
- **React Router** for the navigation
- **Redux** for the front end state management (room, users, tokens are managed as redux states)
- **Socket.io** to manage real-time events, so that multiple users can see the all changes in real time
- **Jest / React Testing Library** for redux unit tests
- **Mocha and Chai** for the API tests
- **Cypress** for the end to end "feature" tests
- **Github** Actions to run continuous integration
- **Heroku** for the deployments and hosting

Also tried Golang for the backend but I finally decided to focus on javascript for this project.

# Features

Create a room

![](createroom.gif)

Join the room and add tokens

![](addtoken.gif)

Move the tokens on the map

![](movetokens.gif)

# Credits

All images (map and tokens) are from Ross McConnell @ https://2minutetabletop.com/
