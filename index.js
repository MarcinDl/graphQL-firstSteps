var express = require('express');
var {graphqlHTTP} = require('express-graphql');
var { buildSchema } = require('graphql');


// Initialize a GraphQL schema
var schema00 = buildSchema(`
    type Query {
        user(id: Int!): Person
        users(shark: String): [Person]
    },
    type Person {
        id: Int
        name: String
        age: Int
        shark: String
    }
`);

// Sample users
var users = [
    {
        id: 1,
        name: 'Brian',
        age: '21',
        shark: 'Great White Shark'
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        shark: 'Whale Shark'
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        shark: 'Hammerhead Shark'
    },
    {
        id: 4,
        name: 'Joseph',
        age: '23',
        shark: 'Tiger Shark'
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        shark: 'Hammerhead Shark'
    }
];
// Return a single user

var getUser = function(args) {
    var userID = args.id;
    console.log(args)
    // return users.filter(user => user.id == userID)[0];
    return users[2];
}

// Return a list of users (takes an optional shark parameter)
var retrieveUsers = function(args) {
    if (args.shark) {
        var shark = args.shark;
        return users.filter(user => user.shark === shark);
    } else {
        return users;
    }
}

var root00 = {
    user: getUser,  // Resolver function to return user with specific id
    users: retrieveUsers
};

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Root resolver
var root = {
  hello: () => 'Hello world!'
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema00,  // Must be provided
  rootValue: root00,
  graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));