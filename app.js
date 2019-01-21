const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const cors = require('cors')
// const queries = require('./queries')
// const { GraphQLServer } = require('graphql-yoga')
const listener = () => console.log(`Listening on port ${port}`)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())

app.use('/graphql', graphqlHTTP({

}))



// const typeDefs = `
// type Query {
//   info: String!
//   feed: [Link!]!
// }

// type Link {
//   id: ID!
//   description: String!
//   url: String!
// }
// `
// let links = [{
//    id: 'link-0',
//    url: 'www.howtographql.com',
//    description: 'Fullstack tutorial for GraphQL'
//  }]
 
//  const resolvers = {
//    Query: {
//      info: () => `This is the API of a Hackernews Clone`,
//      // 2
//      feed: () => links,
//    },
//    // 3
//    Link: {
//      id: (parent) => parent.id,
//      description: (parent) => parent.description,
//      url: (parent) => parent.url,
//    }
//  }


// const server = new GraphQLServer({
//    typeDefs,
//    resolvers,
// })

// server.start(() => console.log(`Server is running on http://localhost:4000`))

// app.use((req, res) => {
//    res.status(404).json({error: {message: 'data not found'}})
// })

// app.use((err, req, res, next) => {
//    console.log("Error", err)
//    const status = err.status || 500
//    res.status(status).json({error: err.message})
// })

app.listen(port, listener)
