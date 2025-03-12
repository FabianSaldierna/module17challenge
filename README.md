# module17challenge
Solved code for the module 17 challenge

## Walkthrough Video
https://drive.google.com/file/d/1-FwnuG3DN8cyinuA3ahzjXm06EJbwzat/view

## Description
This project solves the challenge for Module 17 with MongoDB, Mongoose, Express and Typescript. It is an API that uses mongoose to connect to a local Mongo DataBase to get a users and a thoughts collections.

## Usage
1. Follow installation steps to compile and install the MongoDB seeds (the seeds are optional).
2. You may use insomnia to query the API
3. These are the available methods:

For the users DB:

   | Function                 | Method        |  URI                                    |
   | ------------------------ | ------------- | --------------------------------------- |
   | get all users            |  GET          |  /api/users                             | 
   | add a user               |  POST         |  /api/users                             |
   | change data from a user  |  PUT          |  /api/users/:userid                     |
   | get one user             |  GET          |  /api/users/:userid                     |
   | add a friend             |  PUT          |  /api/users/:userid/friends/:friendid   |
   | delete a friend          |  DELETE       |  /api/users/:userid/friends/:friendid   |
   | delete a user            |  DELETE       |  /api/users/:userid                     | 
    
For the thoughts DB:

   | Function                    | Method        |  URI                                             |
   | --------------------------- | ------------- | ------------------------------------------------ |
   | get all thoughts            |  GET          |  /api/thoughts                                   | 
   | add a thoughts              |  POST         |  /api/thoughts                                   |
   | change data from a thought  |  PUT          |  /api/thoughts/:thoughtid                        |
   | get one thought             |  GET          |  /api/thoughts/:thoughtid                        |
   | add a reaction              |  PUT          |  /api/thoughts/:thoughtid/reactions              |
   | delete a reaction           |  DELETE       |  /api/thoughts/:thoughtid/reactions/:reactionid  |
   | delete a thought            |  DELETE       |  /api/thoughts/:thoughtid                        |

## Images
An example of the full users collection:
  ![image](https://github.com/user-attachments/assets/ee4c9dbe-a90e-45ec-87ff-47b601b18d9c)

An example of the full thoughts collection:
  ![image](https://github.com/user-attachments/assets/b7dfb7ad-869b-4c31-a219-c4f525061894)

## Installation
In order to use the package ou may need to install NPM packages with:

  npm i

Then you may want to insert data for testing purposes on the postgres db (kanban_db) with:

  npm run seed

To run the program, use the following command:
  npm run start

## Credits
Fabian Saldierna.

## License
An MIT standard license was used. You may refer to it from the repo.

## Features
Implemented the "mongoose" npm package to interact with MongoDB.
