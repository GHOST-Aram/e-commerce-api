# e-commerce-api
This is a CRUD backend API for an e-commerce web application. The API has been implemented using the microservice architecture. All the components of this API are in one git repository. This documentation will serve as a brief guide on how you can locally install, test and run this e-commerce backend API.

This documentation covers the following sections:
- [Features of the API](#features-of-the-api) 
- [Cloning the source code](#cloning-the-source-code)
- [Installing dependencies in the parent project.](#installing-dependencies-in-the-parent-project)
- [Installing dependencies in the microservice applications.](#installing-dependencies-in-the-microservice-applications)
- [Testing the microservice applications.](#testing-the-microservice-applications)
- [Running the microservice applications in development mode.](#running-the-microservice-applications-in-development-mode)
- [Compile Typescript code.](#compile-typescript-code)
- [Installing dependencies in the api gateway app.](#installing-dependencies-in-the-api-gateway-app)
- [## Running the API gateway application in development mode.](#running-the-api-gateway-application-in-development-mode)

## Features of the API
This API consist of seven independent microservices and an API gateway application. 
All the microservices can be deployed on different servers or on the same host with distinct ports for each microservice. 

The following is the list of applications in this project.

1. Authenticator
2. Carts
3. Orders
4. Payments
5. Products
6. Reviews
7. Users

All the microservices listed above use different mongodb databases. All the databases belong in the same mongodb cluster. Each of the microservices has a default port configuration to run on just in case you forget to provide one.

## Cloning the source code.
The first step setting up this project in your local machine is to clone it.

Execute the following command to clone this repository:

```
git clone https://github.com/GHOST-Aram/e-commerce-api
```

## Installing dependencies in the parent project.
As you have probably noticed, we have a `package.json` file in the root directory of the whole project. This means that the root project folder was initialized as a Nodejs project. This does not mean that all the microservices depends on the root project directory. The root project directory was only initialized this way to facilitate working on the microservices from the root directory.

Execute the following command in the root directory to install relevant modules.

```
npm install
```

The above command installs modules in the parent project. This command does not install the dependencies of the microservice applications. Each microservice has its own dependencies. The dependencies of the applications can be installed independent of each other or the parent project. Let us explore how to install dependencies for the individual application in the next section.

## Installing dependencies in the microservice applications.
Each microservice has its own `package.json` file with the list of development and production dependencies. You can install the dependencies of each microservice in either of the following ways:

- From the main project directory
- From Within the target application directory

#### 1. From the parent project directory.
Here you can install an application's dependency without manually navigating into the app directory.

The  dependencies installation command of each application follows a convention that is shared throught the commands list. The command follows the format below.

```
npm run install:<application-name>
```

Following the above format, we can install the dependencies of the the authenticator app using the command below.

```
npm run install:authenticator
```

Installing dependencies of all the applications from the main project directory follows the above format.

#### 2. From within the target application directory.
This alternative is obvious. You can manually navigate into an app and execute an npm installation command. 

For example, to install dependencies in the authenticator application. Navigate into the authenticator app and execute the installation command as follows.
```
cd app/authenticator 

npm install
```

All the microservices in this project share the same folder structure. You can easily install dependencies in the other applications using the above methods. All you need to do is substitute the target application name in the above commands.

## Testing the microservice applications.
After installing dependencies, the microservices can be tested independently. Testing of the microservices can be done in two way described below.

#### 1. From the main project directory.
The `package.json` file in the parent directory contains commands for testing each microservice independently. The custom cammands allow us to test without the need to physically navigate into each application. 

The test command of each application follows a convention that is shared throught the commands list. The command follows the format below.

```
npm run test:<application-name>
```

Following the above format, we can test the authenticator using the command below:

```
npm run test:authenticator
```

#### 2. From within the tagert application directory.
An alternative method of testing the microservices is to manually navigate into each then execute a test command.

Execute the following commands to test the authenticator app:

```
cd app/authenticator

npm test
```

All the microservice applications in this project use the same testing library and configurations. To test the other applications, use either of the above methods. Remember to substitute the application name with the desired target application name.

## Running the microservice applications in development mode.
Similar to installing dependencies and testing, the microservices and also be run independently in development mode in two ways. The microservices can be run in two diffent ways:

#### 1. From the main project directory.
The command for testing an individual microservice in dev mode follows the following format

```
npm run <application-name>
```
Following the above command format we can run the `carts` application using the following command.

```
npm run carts
```

To run any one of the applications, replace `carts` with the target app name. For example, the `products` products microservice can be run in dev mode using the command below.

```
npm run products
```

#### 2. From within the tagert application directory.
Each application in this project is designed to be run independent of other applications. In this alternative, you can manually navigate into an application of your choice and run. 

We will use the `users` application for this demostration. Execute the following commands to  run the `users` microservice in dev mode.

```
cd apps/users

npm run dev
```

You can use the same commands above to run the other apps in this project. Remember to substitute the application name with the target app name.

## Compile Typescript code.
This project has been created using Typescript. It's totally OK to run Typescript code in development mode. When it's time for deployment, it's recommended to deploy a build code rather than the development code. This section of the documentation will guide you on how to compile the source code of each microservice application into JavaScript build code.

This project is designed to allow for  independent code compilation in any application.Compiling the source code of an application in this project can be done in two ways:

- From the main project directory
- From Within the target application directory

#### From the main project directory.
The `package.json` file in the main project directory contains commands for compiling the source code of each application. The commands follow an easy to remeber format. 

To compile the source code of any application, use the following command:

```
npm run build:<application-name>
```

The word 'application-name' in the angular brackets is meant to be replaced by the target application name. For example, the `reviews` application code can be compiled using the following command.

```
npm run build:reviews
```

#### From within the target application directory.
A simpler and more straight-foward way to compile development code into production code is to navigate into the target directory and compile. Commands of the following format can be used to compile the development code of any application in this project:

```
cd apps/<application-name>

npm run build
```

Using the above format, we can compile the source code of the `reviews` application as follows:

```
cd apps/reviews

npm run build
```


Either of the above compilation procedures generate a `build` directory within the target application. The `build` directory contains plain JavaScript code without any types. The `build` directory will be deployed when the target app is ready for deployment.

## Installing dependencies in the api gateway app.
By the design of this project, all the microservices are accessible through one api-gateway application. The dependencies of the API gateway application is fully independent of the other applications. 

Follow the steps bellow to install the dependencies in the gate-way application.
1. Execute the following command to navigate into the gate-way directory.

```
cd gate-way
```

2. Execute the following command install dependencies.

```
npm install
```

## Running the API gateway application in development mode. 
Follow the procedure below to run the API gateway app in dev mode.

1. Execute the following command to navigate to the API gateway directory.

```
cd gate-way
```
2. Execute the following command to run the API gateway application in developments.

```
npm run dev
```

Running the API gateway only starts the gate way app but not the individual services. You must run the services you want to deliver through this gateway to make the accessible.

