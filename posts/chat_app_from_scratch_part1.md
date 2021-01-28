---
title: 'Chat app from scratch - part 1 - setup'
date: '2021-01-28'
---

In this post I build a chat app from scratch using the MERNG stack which is **Mongodb**, **Express**, **React**, **Node**, **GraphQL**.

### Setting up the app

1. Make prj dir using the terminal
    ```bash
    touch nameOfYourChoosing
    cd nameYouChooseAbove
    Npm init
    git init
    touch .gitignore index.js
    ```
2. npm install apollo-server/graphql

    ```bash
    npm init
    git init
    touch gitignore index.js
    npm install apollo-server/graphql
    ```

### Setting up the server

1. add Appolo and GraphQL dependencies to index.js

    ```javascript
    const { ApolloServer } = require('apollo-server');
    const gql = require('graphql-tag');
    ```
2. Create type defs

    ```javascript
    const typeDefs = gql`
        type Query{
            sayHi: String!
        }
        `
    ```

3. Create resolvers

    ```javascript
    const resolvers = {
        Query: {
            sayHi: () => 'Hola mundo!'
        }
    }
    ```
4. Create server 

    ```javascript
    const server = new ApolloServer ({
        typeDefs,
        resolvers
    });
    ```
5. Run server 

    ```javascript
    server.listen({ port: 5000 })
        .then(res => {
            console.log(`Servering running ${res.url}`)
        })
    ```