---
title: 'Building a React/GraphQL chat app from scratch - part 2'
date: '2021-02-03'
description: 'Connecting the app to the database.'
---

In part 1 we completed the initial setup of the app and got our server running. In part 2 we'll get our database connected to our app.

### Connecting to the database

1. Open the .gitignore file and add the following two lines at the top exactly like this:

        node_modules
        config.js

    As the intuitive file name implies, this file stops whatever is listed in it from being sent to your repo. 

2. Create a new file called config.js in the same directory as index.js. We will store the database password in this file so that it is kept private.

3. Open config.js in your editor and add:
    ```javascript
    module.exports = {
        MONGODB:
    }
    ```
4. Grab your MongoDB cluster connection url and password and add them as a string. The result should look similar to this except with your cluster's unique URL and your password subbed in as indicated below. 
    ```javascript
    module.exports = {
        MONGODB: 'mongodb+srv://clus:YOURPASSWORDGOESHERE@cluster0.htwkq.mongodb.net/test'
    }
    ```

3. Open index.js and import mongoose at the top after the existing imports.
    ```javascript
    const mongoose = require('mongoose');
    ```
4. Now we need to import our database information from the config.js file. While this is yet another import in our index.js file, it is what is known as a relative import which are usually kept seperate of dependency imports for readability like so:

    ```javascript
    //dependency imports
    const { ApolloServer } = require('apollo-server');
    const gql = require('graphql-tag');
    const mongoose = require('mongoose');

    //relative imports
    const { MONGODB } = require('./config.js');
    ```
5. Next we need to add our database connection to our block of code that runs the server. 
    ```javascript
    // connect to db and run server
    mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB connected');
            return server.listen({ port: 5000 });
        })
        .then((res) => {
            console.log(`Server running ${res.url}`);
        })

    ```
6. Make sure you've saved your updates in the text editor. 

7. If your server is already running in the terminal you will need to stop it (control + c) before starting it with 

    ```bash
    node index
    ```

8. In the terminal you should see your console.log messages indicating that the app is connected to MongoDb and that the server is running. You may notice that if you open the app in the browser that it doesn't look any different. That is because our database is empty and the data we're seeing is data we've hard coded in our app. Lets start to change that.

### Manually adding data to MongoDb

1. Go to your cluster in MongoDb

2. Click create database 

3. Choose a name for the database and for a collection. I used the app name and posts respectively.

4. With your collection selected click insert document. A popup with an ID line should appear. Typing enter should start a new line. Create the following additional lines:

        body : "First post"
        username: "Jane Doe"
        createdAt: "Some point"

    Then click insert and you should see what you just entered populate in your collection.

### Building models:

1. Create a new directory called models in the app's directory

2. Within that directory create files named Post.js and User.js. While not case sensitive, convention is to capitalize these particular file names.

3. Open Post.js and add the following code:

    ```javascript 
    const { model, Schema } = require('mongoose');

    const postSchema = new Schema({
        body: String,
        username: String,
        createdAt: String,
        comments: [
            {
                body: String,
                username: String,
                createdAt: String
            }
        ],
        likes: [
            {
                username: String,
                createdAt: String
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    });

    module.exports = model('Post', postSchema);
    ```

4. Now open User.js and add this code:

    ```javascript
    const { model, Schema } = require('mongoose');

    const userSchema = new Schema({
        username: String,
        password: String,
        email: String,
        createdAt: String
    })

    module.exports = model('User', userSchema);

    ```

5. Next in index.js we need to import the Post.js file

    ```javascript
    //relative imports
    const Post = require('./models/Post');
    const { MONGODB } = require('./config.js');
    ```

6. Update our typeDefs block:

    ```javascript
    const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query {
        getPosts: [Post]
    }
    `;
    ```

7. And update our resolvers block:

    ```javascript
    const resolvers = {
        Query: {
            async getPosts() {
                try {
                    const posts = await Post.find();
                    return posts;
                } catch(err) {
                    throw new Error(err);
                }
            }
        }
    };
    ```

### Getting data from MongoDb in app

1. Go back in your config.js file and update the url changing test to the name of the database you just created manually:

 ```javascript
    module.exports = {
        MONGODB: 'mongodb+srv://clus:YOURPASSWORDGOESHERE@cluster0.htwkq.mongodb.net/NAMEOFYOURDATABASE'
    }
 ```

 2. Make sure you've saved all these updates

 3. Stop/start the server 

 4. Navigate to the app in the browser 

 5. Adjust the query on the left to match our Schema:

        query{
            getPosts {
                id
                body
                createdAt
                username
            }
        }

6. Click the play button and you should see the right side of the screen update to match the data we manually entered in the database earlier. Voila! Things are happening.

7. That concludes part 2 of the series. Your index.js file should look like this now:

    ```javascript
    //dependency imports
    const { ApolloServer } = require('apollo-server');
    const gql = require('graphql-tag');
    const mongoose = require('mongoose');

    //relative imports
    const Post = require('./models/Post');
    const { MONGODB } = require('./config.js');

    const typeDefs = gql`
        type Post {
            id: ID!
            body: String!
            createdAt: String!
            username: String!
        }
        type Query {
            getPosts: [Post]
        }
        `;

    const resolvers = {
        Query: {
            async getPosts() {
                try {
                    const posts = await Post.find();
                    return posts;
                } catch(err) {
                    throw new Error(err);
                }
            }
        }
    };

    // creates server
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    // connect to db and run server
    mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB connected');
            return server.listen({ port: 5000 });
        })
        .then((res) => {
            console.log(`Server running ${res.url}`);
        })

    ```
    
    Stay tuned for part 3 of the series!




