# e-commerce-api
This is a CRUD backend API for an e-commerce web app. The API has been implemented using the microservice architecture. All the components of this API are in one git repository. This documentation will serve as a brief guide on how you can locally install, test, and run this e-commerce backend API.

This documentation covers the following sections:
- [Features of the API](#features-of-the-api) 
- [Cloning the source code](#cloning-the-source-code)
- [Installing dependencies in the parent project.](#installing-dependencies-in-the-parent-project)
- [Installing dependencies in the microservice apps.](#installing-dependencies-in-the-microservice-apps)
- [Testing the microservice apps.](#testing-the-microservice-apps)
- [Running the microservice apps in development mode.](#running-the-microservice-apps-in-development-mode)
- [Compile Typescript code.](#compile-typescript-code)

## Features of the API
This API consists of seven independent microservices. All the microservices can be deployed on different servers or the same host with distinct ports for each microservice. 

The following is the list of apps in this project.

1. [Authenticator](./authenticator.md)
2. [Carts](./carts.md)
3. [Orders](./orders.md)
4. [Payments](payments./.md)
5. [Products](./products.md)
6. [Reviews](./reviews.md)
7. [Users](./users.md)

All the microservices listed above use different MongoDB databases. All the databases belong in the same MongoDB cluster. Each of the microservices has a default port configuration to run on just in case you forget to provide one.

## Cloning the source code.
The first step in setting up this project in your local machine is to clone it.

Execute the following command to clone this repository:

```
git clone https://github.com/GHOST-Aram/e-commerce-api
```

## Installing dependencies in the parent project.
As you have probably noticed, we have a `package.json` file in the root directory of the whole project. This means that the root project folder was initialized as a Nodejs project. This does not mean that all the microservices depend on the root project directory. The root project directory was only initialized this way to facilitate working on the microservices from the root directory.

Execute the following command in the root directory to install relevant modules.

```
npm install
```

The above command installs modules in the parent project. This command does not install the dependencies of the microservice apps. Each microservice has its own dependencies. The dependencies of the apps can be installed independently of each other or the parent project. Let us explore how to install dependencies for the individual app in the next section.

## Installing dependencies in the microservice apps.
Each microservice has its own `package.json` file with a list of development and production dependencies. You can install the dependencies of each microservice in either of the following ways:

- From the main project directory
- From Within the target app directory

#### 1. From the parent project directory.
Here you can install an app's dependency without manually navigating into the app directory.

The dependencies installation command of each app follows a convention that is shared throughout the commands list. The command follows the format below.

```
npm run install:<app-name>
```

Following the above format, we can install the dependencies of the authenticator app using the command below.

```
npm run install:authenticator
```

Installing dependencies of all the apps from the main project directory follows the above format.

#### 2. From within the target app directory.
This alternative is obvious. You can manually navigate into an app and execute the npm installation command. 

For example, to install dependencies in the authenticator app. Navigate into the authenticator app and execute the installation command as follows.
```
cd app/authenticator 

npm install
```

All the microservices in this project share the same folder structure. You can easily install dependencies in the other apps using either of the above procedures. All you need to do is substitute the target app name in the above commands.

## Testing the microservice apps.
After installing dependencies, the microservices can be tested independently. Testing of the microservices can be done in two ways.

- From the main project directory.
- From within the target app.

#### 1. From the main project directory.
The `package.json` file in the parent directory contains commands for testing each microservice independently. The custom commands allow us to test without the need to physically navigate into each app. 

The test command of each app follows a convention that is shared throughout the commands list. The commands follow the format below.

```
npm run test:<app-name>
```

Following the above format, we can test the authenticator using the command below:

```
npm run test:authenticator
```

#### 2. From within the target app directory.
An alternative method of testing the microservices is to manually navigate into each and then execute a test command.

Execute the following commands to test the authenticator app:

```
cd app/authenticator

npm test
```

All the microservice apps in this project use the same testing library and configurations. To test the other apps, use either of the above methods. Remember to substitute the app name with the desired target app name.

## Running the microservice apps in development mode.
Similar to installing dependencies and testing, the microservices and also be run independently in development mode. 

The microservices can be run in two different ways:
- From the main project directory.
- From within the target app.

#### 1. From the main project directory.
The command for testing an individual microservice in dev mode follows the following format

```
npm run <app-name>
```
Following the above command format we can run the `carts` app using the following command.

```
npm run carts
```

To run any one of the apps, replace `carts` with the target app name. For example, the `products` products microservice can be run in development mode using the command below.

```
npm run products
```

#### 2. From within the target app directory.
Each app in this project is designed to be run independently of other apps. In this alternative, you can manually navigate into an app of your choice and run it. 

We will use the `users` app for this demonstration. Execute the following commands to run the `users` microservice in dev mode.

```
cd apps/users

npm run dev
```

You can use the same commands above to run the other apps in this project. Remember to substitute the app name with the target app name.

## Compile Typescript code.
This project has been created using Typescript. It's OK to run Typescript code in development mode. When it's time for deployment, it's recommended to deploy a build code rather than the development code. This section of the documentation will guide you on how to compile the source code of each microservice app into JavaScript build code.

This project is designed to allow for independent code compilation in any app. Compiling the source code of an app in this project can be done in two ways:

- From the main project directory
- From Within the target app directory

#### 1. From the main project directory.
The `package.json` file in the main project directory contains commands for compiling the source code of each app. The commands follow an easy-to-remember format. 

To compile the source code of any app, use the following command:

```
npm run build:<app-name>
```

The word 'app-name' in the angular brackets is meant to be replaced by the target app name. For example, the `reviews` app code can be compiled using the following command.

```
npm run build:reviews
```

#### 1. From within the target app directory.
Another way to compile development code into production code is to navigate into the target directory and compile it. Commands of the following format can be used to compile the development code of any app in this project:

```
cd apps/<app-name>

npm run build
```

Using the above format, we can compile the source code of the `reviews` app as follows:

```
cd apps/reviews

npm run build
```


Either of the above compilation procedures generates a `build` directory within the target app. The `build` directory contains plain JavaScript code without any Typescript features. The `build` directory will be deployed when the target app is ready for deployment.

This document has covered how to set up the project on a localhost. To learn how the authentication works, visit [the authenticator documentation](./authenticator.md)

