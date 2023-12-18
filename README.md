# What's BioCareAI?

BioCareAI 🌐👩‍⚕️ is a medical web tool that integrates biomedical data from ESP32 using Firebase's RealTimeDataBase. 📊💻 BioCareAI also features a custom chatbot, which uses OpenAI's GPT-3.5 with a medical focus, allowing users to interact in a unique way. 🤖👨‍⚕️
#### [Click here (Demo)](https://biocareai.web.app)

![image_2023-12-18_105528731](https://github.com/carlobeni/BioCareAI/assets/110142022/8fffa82e-c99c-48a6-bb4d-a3edf3f25f5f)
![image](https://github.com/carlobeni/BioCareAI/assets/110142022/0ed0054c-1105-42ad-89f6-ba7cbe28496e)

# ESP Code

In ESP_main.cpp you will find the complete code for the ESP32 or by clicking on [ESP32_main.cpp](https://github.com/carlobeni/BioCareAI/blob/master/ESP32_main.cpp)

### Sensor Section

This section of the code is responsible for interfacing with the MAX30105 sensor to measure heart rate (BPM) and blood oxygen levels (SpO2).

### Initialization

The `initSensor` function initializes the MAX30105 sensor with the required settings.

#### Update SpO2 and BPM

The `updateSpo2andBPM` function reads data from the sensor and updates the SpO2 and BPM values.

### Web Section

In this section, the code handles communication with Firebase for data storage and retrieval.

#### Initialization

The `initWiFi` function connects the device to a WiFi network, and `initFirebase` establishes a connection to the Firebase Realtime Database.

#### Sending Data to Firebase

The `loop` function continuously updates sensor data and sends it to the Firebase database at regular intervals.


## Available Scripts (ReactJS)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
