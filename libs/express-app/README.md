# express-app

Generator for Express applications and APIs.

## Getting started

Install this plugin in your existing nx repo.

```sh
npm install --save-dev @nx-gems/express-app
```

Run the plugin to generate an api

```sh
nx g @nx-gems/express-app:express-app test-api
```

This will create an express app at `/apps/test-api` with an example route of `/accounts`.

Execute the following command to run the express app:

```sh
nx serve test-api
```

Now point your browser to http://localhost:3333/accounts to test the example route.

## Running unit tests

Run `nx test express-app` to execute the unit tests via [Jest](https://jestjs.io).
