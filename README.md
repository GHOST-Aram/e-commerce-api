# e-commerce-api
This is a CRUD backend API for an e-commerce web app. The API is implemented using the microservice architecture. All the components of this API are in one git repository. This documentation serves as a brief guide on how you can locally install, test, and run the API.

This documentation covers the following sections:
- [Components of the API](#components-of-the-api) 
- [Cloning the source code](#cloning-the-source-code)
- [Installing dependencies in the parent project.](#installing-dependencies-in-the-parent-project)
- [Installing dependencies in the apps.](#installing-dependencies-in-the-apps)
- [Testing the apps.](#testing-the-apps)
- [Running the apps in development mode.](#running-the-apps-in-development-mode)
- [Compile Typescript code.](#compile-typescript-code)

## Components of the API
This API consists of seven independent apps. All the apps can be deployed on different servers or the same host with distinct ports for each app. 

The following is the list of apps in this project.

1. [Authenticator](./authenticator.md)
2. [Carts](./carts.md)
3. [Orders](./orders.md)
4. [Payments](payments./.md)
5. [Products](./products.md)
6. [Reviews](./reviews.md)
7. [Users](./users.md)

All the apps listed above use different MongoDB databases. All the databases belong in the same MongoDB cluster. Each of the apps has a default port configuration to run on just in case you forget to provide one.

## Cloning the source code.
The first step in setting up this project in your local machine is to clone it.

Execute the following command to clone this repository:

```
git clone https://github.com/GHOST-Aram/e-commerce-api
```

## Installing dependencies in the parent project.
As you have probably noticed, we have a `package.json` file in the root directory of the whole project. This means that the root project folder is initialized as a Nodejs project. This does not mean that all the apps depend on the root project directory. The root project directory is only initialized this way to facilitate working on the apps from the root directory.

Execute the following command in the root directory to install relevant modules.

```
npm install
```

The command above installs modules in the parent project. This command does not install the dependencies of the apps. Each app has its own dependencies. The dependencies of the apps can be installed independently of each other or the parent project. Let us explore how to install dependencies for the individual app in the next section.

## Installing dependencies in the app apps.
Each app has its own `package.json` file with a list of development and production dependencies. You can install the dependencies of each app in either of the following ways:

- From the main project directory
- From Within the target app directory

#### 1. From the parent project directory.
Here you can install an app's dependency without manually navigating into the app directory.

The dependencies installation command of each app follows a convention that is shared throughout the commands list. The commands are defined in the following format.

```
npm run install:<app-name>
```

We can install the dependencies of the Authenticator using the following command.

```
npm run install:authenticator
```

Installing dependencies of all the apps from the main project directory follows the above format.

#### 2. From within the target app directory.
This alternative is obvious. You can manually navigate into an app and execute the npm installation command. 

For example, to install dependencies in the Authenticator. Navigate into the Authenticator and execute the installation command as follows.
```
cd app/authenticator 

npm install
```

All the apps in this project share the same folder structure. You can easily install dependencies in the other apps using either of the above procedures. All you need to do is substitute the target app name in the above commands.

## Testing the apps.
After installing dependencies, the apps can be tested independently. Testing of the apps can be done in two ways.

- From the main project directory.
- From within the target app.

#### 1. From the main project directory.
The `package.json` file in the parent directory contains commands for testing each app independently. The custom commands allow us to test without the need to physically navigate into each app. 

The test command of each app follows a convention that is shared throughout the commands list. The commands matche the following format.

```
npm run test:<app-name>
```

We can test the Authenticator using the following command:

```
npm run test:authenticator
```

#### 2. From within the target app directory.
An alternative method of testing the apps is to manually navigate into each and then execute a test command.

Execute the following commands to test the Authenticator:

```
cd app/authenticator

npm test
```

All the apps in this project use the same testing library and configurations. To test the other apps, use either of the above methods. Remember to substitute the app name with the desired target app name.

## Running the apps in development mode.
The apps can be run independently in development mode using either of the following ways:
- From the main project directory.
- From within the target app.

#### 1. From the main project directory.
The command for testing an individual app in dev mode follows the following format

```
npm run <app-name>
```
Following the above command format we can run the `carts` app using the following command.

```
npm run carts
```

To run any one of the apps, replace `carts` with the target app name.
We can use the following command to run the `products` app in development mode.

```
npm run products
```

#### 2. From within the target app directory.
Each app in this project is designed to be run independently of other apps. In this alternative, you can manually navigate into an app of your choice and run it. 

Execute the following commands to run the `users` app in dev mode.

```
cd apps/users

npm run dev
```

You can use the same commands above to run the other apps in this project. Remember to substitute the app name with the target app name.

## Compile Typescript code.
This project is created using Typescript. While it's OK to run Typescript code in development mode, plain JavaScript is recommended for deployment. This section of the documentation provides a guide on how to compile the source code of each app into JavaScript build code.

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


Either of the above compilation procedures generates a `build` directory within the target app. The `build` directory contains plain JavaScript code without any Typescript features. The `build` directory is be deployed when the target app is ready for deployment.



See also:
[The Authenticator documentation](./authenticator.md)

