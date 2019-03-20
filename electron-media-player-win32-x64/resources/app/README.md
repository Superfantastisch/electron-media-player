# ElectronMediaPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Getting started

To get started you have to install Node.js and npm. [Node.js](https://nodejs.org)

You also need to install the angular cli. [Angular CLI](https://cli.angular.io/)

Installing angular-cli globally on your system:
`npm install -g @angular/cli`

After cloning the repo you have to go in the root directory of your project and then run: 
`npm install`

Then run 
`npm run electron` 
and you should have successfully created the first basic app.

Run `npm run start` to build and serve the app on `http://localhost:4200/`, rebuilding on file changes. However, for Electron-specific features (e.g., filesystem access), additionally run `npm run electron:serve`
to run the app with hot-reload and Electron.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## To run the application
Run `ng serve`
Run in a second terminal `npm run electron:serve`

## To build the application
Run `npm run electron-aot`
Install `npm install electron-packager -g`
Install `npm install electron-packager -D`
Finaly on Windows run `electrong-packager . --platform=win32`
