# e-commerce-api
This is a CRUD backend API for an e-commerce web application. The API has been implemented using the microservice architecture. All the components of this API are in one git repository. This documentation will serve as a brief guide on how you can locally install, test and run this e-commerce backend API.

## Features
This API consist of seven independent microservices and an API gateway application. 
All the microservices can be deployed on different servers or on the same host with distinct ports for each microservice. The microservices are as follows

1. Authenticator
2. Carts
3. Orders
4. Payments
5. Products
6. Reviews
7. Users

All the microservices listed above use different mongodb databases under the same cluster. Each of the microservices has a default port configuration to run on jut in case you forget to provide one.

## Local Set Up
The first action you will take towards setting up this project in your local machine is to clone  or download it. Feel free to decide which action suits you best and execute it.

After creating a local copy of this repository, you can now start worrying about what technologies you need to start using it. The whole project is created using Nodejs and Typescript. You need the latest stable version of Nodejs and npm to run this app. Typescript will be auto-installed once we get to the modules installation part.

### Installing modules
As you have probably noticed, we have a `package.json` file in the root directory of the whole project. This means that the root project folder was initialized as a Nodejs project. This does not mean that all the microservices depends on the root project directory. The root project directory was only initialized this way to facilitate working on the microservices from the root directory.

Execute the following command in the root directory to install relevant modules.

```
npm install
```

## Testing an Individual Microservice.