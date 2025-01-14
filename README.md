# Prueba Tecnica Devsu

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Steps for Local Running

To run the project locally, ensure that the backend server is running on port 3002. If the backend is running on a different port or URL, update the `proxy.conf.json` file accordingly by changing the `target` value to the new URL.

Example `proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://your-backend-url",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

After updating the proxy configuration, run the project in local mode with a proxy to the local backend server by executing the following command in the terminal:

```bash
npm run start:local
```

## Steps for Execute Tests

To run the tests and generate a coverage report, execute the following command in the terminal:

```bash
npm run test:coverage:ci
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
