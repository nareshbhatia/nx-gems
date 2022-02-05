# express-app

Generator for Express applications and APIs.
This library was generated with [Nx](https://nx.dev).

## Getting started

Install the following packages to your existing nx repo.

```sh
npm install --save-dev @nx-gems/express-app @nrwl/express
```

Run the plugin to generate an api

```sh
nx g @nx-gems/express-app:express-app test-api
```

This will create an express app at `/apps/test-api` with a example route of `/accounts`.

Execute the following command to run the express app:

```sh
nx serve test-api
```

Now point your browser to http://localhost:33333/accounts to test the example route.

## Running unit tests

Run `nx test express-app` to execute the unit tests via [Jest](https://jestjs.io).
