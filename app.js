const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const bodyParser = require('body-parser')
const cors = require('cors')
// const queries = require('./queries')
// const { GraphQLServer } = require('graphql-yoga')
const listener = () => console.log(`Listening on port ${port}`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}))

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
