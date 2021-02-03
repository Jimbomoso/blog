---
title: 'Building a React/GraphQL chat app from scratch - part 1'
date: '2021-01-28'
description: 'Part 1 - Initial setup.'
---

In this series of posts we'll build a chat app from scratch using the MERNG stack which is **Mongodb**, **Express**, **React**, **Node** and **GraphQL**.

### Setting up the app

1. Open the terminal and make a project directory, navigate into that directory, initialize npm and git, and create gitignore and index files.
    ```bash
    touch nameOfYourChoosing
    cd nameYouChooseAbove
    Npm init
    git init
    touch .gitignore index.js
    ```
2. In the terminal install apollo-server/graphql

    ```bash
    npm install apollo-server/graphql
    ```

### Setting up the server

1. In your code editor open the index.js file and add the Appolo and GraphQL dependencies

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
        });
    ```

6. At this point your index.js file should look like this:

    ```javascript
    const { ApolloServer } = require('apollo-server');
    const gql = require('graphql-tag');

    const typeDefs = gql`
            type Query{
                sayHi: String!
            }
            `;

    const resolvers = {
        Query: {
            sayHi: () => 'Hola mundo!'
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.listen({ port: 5000 })
        .then(res => {
            console.log(`Servering running ${res.url}`)
        })
    ```
7. Now we can start the server using the terminal by typing:

    ```bash
    node index
    ```
8. Holding the command key will highlight the server url and clicking on the highlighted url will open a browser tab showing the app being served locally!

9. To stop the server from running, go back to your terminal and type control + c