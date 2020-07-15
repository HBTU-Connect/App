## For Quick Development SetUp
Install Docker and Docker Compose on your machine.
And run the following command

### `docker-compose up --build`
Docker Compose will create an Image of the Development Container of this app

It will fetch the required node image from the docker hub,
and quickly install all the required packages for the app and start the development server 

You can access the app at any of the mentioned address
-  [http://localhost:3000](http://localhost:3000)
-  [http://172.17.0.2:3000](http://172.17.0.2:3000)



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

