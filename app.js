const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const listener = () => console.log(`Listening on port ${port}`)

mongoose.connect('mongodb://kateS:Ben1982@ds121896.mlab.com:21896/sunup-db')
mongoose.connection.once('open', () => {
   console.log('You are connected to the MLab database')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}))

app.use((req, res) => {
   res.status(404).json({error: {message: 'data not found'}})
})

app.use((err, req, res, next) => {
   console.log("Error", err)
   const status = err.status || 500
   res.status(status).json({error: err.message})
})

app.listen(port, listener)
