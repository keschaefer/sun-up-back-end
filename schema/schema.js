const graphql = require('graphql')

const { 
      GraphQLObjectType, 
      GraphQLString, 
      GraphQLSchema,
      GraphQLID,
      GraphQLInt,
      GraphQLList
      } = graphql

let users = [
   {id: "1", name_full: "Kate", org_name: "Kate Inc."},
   {id: "2", name_full: "Ben", org_name: "Ben Inc."},
   {id: "3", name_full: "Islay", org_name: "Islay Inc."}
]

let messages = [
   {id: "10", message: "Hi there!", user_id: "1"},
   {id: "20", message: "I'm smart!", user_id: "2"},
   {id: "30", message: "I'm the best!", user_id: "3"},
   {id: "40", message: "Hallo there!", user_id: "1"},
   {id: "50", message: "I'm dumb!", user_id: "2"},
   {id: "60", message: "I'm the worst!", user_id: "3"},
]

const UserType = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
      id: {type: GraphQLID},
      name_full: {type: GraphQLString},
      org_name: {type: GraphQLString},
      messages: {
         type: new GraphQLList(MessageType),
         resolve(parent, arg) {
            let messageList = messages.filter(message => {
               return parent.id === message.user_id
            })
            return messageList
         }
      }
   })
})

const MessageType = new GraphQLObjectType({
   name: 'Message',
   fields: () => ({
      id: {type: GraphQLID},
      message: {type: GraphQLString},
      user_id: {
         type: UserType,
         resolve(parent, arg) {
            let user = users.find(user => {
               return parent.user_id === user.id
            })
            return user
         }
      },
   })
})

const RootQuery = new GraphQLObjectType ({
   name: 'rootQueryType',
   fields: {
      user: {
         type: UserType,
         args: {id: {type: GraphQLID}},
         resolve(parent, args) {
         //code to get code from our DB
         let user = users.filter(user => {
            return user.id === args.id
            })
         return user[0]
         }
      },
      message: {
         type: MessageType,
         args: {id: {type: GraphQLID}},
         resolve(parent, args) {
         //code to get code from our DB
         let message = messages.find(message => {
            return message.id === args.id
            })
         return message
         }
      },
      users: {
         type: new GraphQLList(UserType),
         resolve(parent, args) {
            return users
         }
      },
      messages: {
         type: new GraphQLList(MessageType),
         resolve(parent, args) {
            return messages
         }
      },
   }
})

module.exports = new GraphQLSchema ({
   query: RootQuery
})