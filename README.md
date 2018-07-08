### Spring as backend and SPA(Vue in this project) as frontend both in a project.

#### This repository shows how to deal with spring and SPA in aspect of structure of project using webpack.

##### See how it works
`./gradlew bootRun`
`npm install && npm start`

Open browser, then go `localhost:3000`

### Backend API
For further works, API uri behind spring can be started with `/api` which can be found in configuration against proxy `webpack.dev.config.js`.
> e.g.) `GET /api/users/{userId}/devices`