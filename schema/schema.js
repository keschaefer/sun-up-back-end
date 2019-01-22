const graphql = require('graphql')
const User = require('../models/user.js')
const Message = require('../models/message.js')

const { 
      GraphQLObjectType, 
      GraphQLString, 
      GraphQLSchema,
      GraphQLID,
      GraphQLInt,
      GraphQLList,
      GraphQLBoolean,
      } = graphql

const UserType = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
      id: {type: GraphQLID},
      name_full: {type: GraphQLString},
      org_name: {type: GraphQLString},
      messages: {
         type: new GraphQLList(MessageType),
         resolve(parent, arg) {
            // let messageList = messages.filter(message => {
            //    return parent.id === message.user_id
            // })
            // return messageList
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
            // let user = users.find(user => {
            //    return parent.user_id === user.id
            // })
            // return user
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
         // let user = users.filter(user => {
         //    return user.id === args.id
         //    })
         // return user[0]
         }
      },
      message: {
         type: MessageType,
         args: {id: {type: GraphQLID}},
         resolve(parent, args) {
         // let message = messages.find(message => {
         //    return message.id === args.id
         //    })
         // return message
         }
      },
      users: {
         type: new GraphQLList(UserType),
         resolve(parent, args) {
            // return users
         }
      },
      messages: {
         type: new GraphQLList(MessageType),
         resolve(parent, args) {
            // return messages
         }
      },
   }
})

const Mutation = new GraphQLObjectType ({
   name: 'Mutation',
   fields: {
      addUser: {
         type: UserType,
         args: {
            password: {type: GraphQLString},
            name_full: {type: GraphQLString},
            email: {type: GraphQLString},
            org_name: {type: GraphQLString},
            current_year_tax: {type: GraphQLInt},
            current_year_energy_cost: {type: GraphQLInt},
            roof_square_footage: {type: GraphQLInt},
            projected_energy_annual_kW: {type: GraphQLInt},
            match_program: {type: GraphQLBoolean},
            match_alerts: {type: GraphQLBoolean}
         },
         resolve(parent, args) {
            console.log(args)
            let user = new User({
               password: args.password,
               name_full: args.name_full,
               email: args.email,
               org_name: args.org_name,
               current_year_tax: args.current_year_tax,
               current_year_energy_cost: args.current_year_energy_cost,
               roof_square_footage: args.roof_square_footage,
               projected_energy_annual_kW: args.projected_energy_annual_kW,
               match_program: args.match_program,
               match_alerts: args.match_alerts,
            })
            return user.save();
         }
      }
   }
})

module.exports = new GraphQLSchema ({
   query: RootQuery,
   mutation: Mutation
})