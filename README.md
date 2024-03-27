# Tuneclash

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.1.

Obtain an API Key: Sign up for a Last.fm account if you haven't already, then visit the API section on the Last.fm website to request an API key.

Store the API Key: To keep your API key secure and not hard-coded in your source files, store it in an env.json file within your project. This file should not be committed to your version control system (like Git). Here's how you structure your env.json:
{
"environment": {
"name": "YourName",
"lastfmkey": "YOUR_LASTFM_API_KEY"
}
}
Replace "YOUR_LASTFM_API_KEY" with the API key you obtained from Last.fm.

Accessing the API Key: In your application, you can load the API key from env.json and use it to make authenticated requests to the Last.fm API. Ensure your application reads the API key from the env.json file dynamically, so it remains secure and flexible for different environments.

Git Ignore: Don't forget to add env.json to your .gitignore file to prevent the API key from being exposed publicly.

Using the API: Now, you can use the stored API key in your application to make requests to the Last.fm API, accessing various endpoints as per your application's needs.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
