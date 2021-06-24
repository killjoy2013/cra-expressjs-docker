# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server:dev`

Runs Expressjs on port 3001

### `npm run both`

Instead of starting webpack dev server and Expressjs one by one, this script starts both at the same time. Again on 3000 and 3001 ports.
You'll still have HMR for CRA and nodemon watch for Espressjs

### `docker-compose up -d`

Builds the project to create its Docker image and run on 3001. 
Open [http://localhost:3001](http://localhost:3001) to test the finished app.


## Main Goals

* Adding an Expressjs server side to a bare metal CRA app without ejecting or changing its base structure. Just decorating it with a server side. So, the CRA any time in the future.

* Since CRA is kept as it is, development time is also kept unchanged. i.e., we still use webpack dev server and still have HMR. We can add any server side logic and create docker image as a whole app.

* We've encupsulated all the complexity in Docker build phase, in Dockerfile. So, development can be done without any extra issues. This makes sense from a developer's perspective to me. 

* We have a ready-to-deploy docker image of our app to any Kubernetes cluster. 

* We can use environment variables in our CRA even though we did not use any server templating.