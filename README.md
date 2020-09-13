## How to run it

#### On the machine

To run the application on the machine use the following command:

    cd game-api && npm run build && npm run start:prod

This will start a process running on http://localhost:3000

#### In a Docker container (docker-compose required)

To run the application inside a docker container use the following command:

    cd game-api && npm run build && cd .. && docker-compose up --build

This will start a process running on http://localhost:3000

## Database

No database has been used. All the datas are stored inside the Node process and are located inside `game-api/src/data-mock`.

## Data model

To respect the data model given the a primary/foreign key structured has been simulated by adding an id field randomly generated using the [UUID](https://www.npmjs.com/package/uuid) library to both games and publishers.

## HTTP Request samples

Examples of API requests can be found inside the folder: `http-requests-samples`.

Inside the `game.http` file are present samples related to all the possible endpoints for the /game API route.

**IMPORTANT**: calls containing the element ID have to be modified every time the server starts because of the randomly generated IDs.

## Dependencies

Except for [nestjs](https://www.npmjs.com/package/@nestjs/core) the project uses two other dependencies:

- [uuid](https://www.npmjs.com/package/uuid): used to generate random and unique IDs.
- [@giacomoferlaino/date-time-utils](https://www.npmjs.com/package/@giacomoferlaino/date-time-utils): package created to make date creation and comparisons easier.
