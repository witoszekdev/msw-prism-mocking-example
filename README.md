# Mocking example

This example [CRA](https://github.com/facebook/create-react-app) app uses [Mock Service Worker](https://mswjs.io/) for mocking API requests. The handlers for the mocks are provided by the [Prism](https://github.com/stoplightio/prism) library.

⚠️ Warning: This example uses `@stoplight/prism-cli` and `@stoplight/prism-http` packages that were not meant by the authors for external usage (outside Prism CLI). They don't have up-to-date documentation

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Requests to the `http://api.dev` will be mocked by MSW.

### `yarn build`

Builds the app for production.

Requests to the `http://api.dev` won't be mocked. MSW code won't be included in the bundle
