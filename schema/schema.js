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
      GraphQLNonNull,
      } = graphql

const UserType = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
      id: {type: GraphQLID},
      password: {type: new GraphQLNonNull(GraphQLString)},
      name_full: {type: new GraphQLNonNull(GraphQLString)},
      email: {type: new GraphQLNonNull(GraphQLString)},
      org_name: {type: new GraphQLNonNull(GraphQLString)},
      current_year_tax: {type: GraphQLInt},
      current_year_energy_cost: {type: GraphQLInt},
      roof_square_footage: {type: GraphQLInt},
      projected_energy_annual_kW: {type: GraphQLInt},
      match_program: {type: GraphQLBoolean},
      match_alerts: {type: GraphQLBoolean},
      messages: {
         type: new GraphQLList(MessageType),
         resolve(parent, arg) {
            return Message.find({user_id: parent.id})
         }
      }
   })
})

const MessageType = new GraphQLObjectType({
   name: 'Message',
   fields: () => ({
      id: {type: GraphQLID},
      message_content: {type: GraphQLString},
      message_date: {type: GraphQLInt},
      user_id: {
         type: UserType,
         resolve(parent, arg) {
            return User.findById(parent.user_id)
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
            return User.findById(args.id)
         }
      },
      message: {
         type: MessageType,
         args: {id: {type: GraphQLID}},
         resolve(parent, args) {
            return Message.findById(args.id)
         }
      },
      users: {
         type: new GraphQLList(UserType),
         resolve(parent, args) {
            return User.find({})
         }
      },
      messages: {
         type: new GraphQLList(MessageType),
         resolve(parent, args) {
            return Message.find({})
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
      },
      updateUser: {
         type: UserType,
         args: {
            id: {type: GraphQLID},
            current_year_tax: {type: GraphQLInt},
            current_year_energy_cost: {type: GraphQLInt},
            roof_square_footage: {type: GraphQLInt},
            projected_energy_annual_kW: {type: GraphQLInt},
            match_program: {type: GraphQLBoolean},
            match_alerts: {type: GraphQLBoolean}
         }, 
         resolve(parent, args) {
            let user = new User({
               current_year_tax: args.current_year_tax,
               current_year_energy_cost: args.current_year_energy_cost,
               roof_square_footage: args.roof_square_footage,
               projected_energy_annual_kW: args.projected_energy_annual_kW,
               match_program: args.match_program,
               match_alerts: args.match_alerts,
            })
            return user.save()
         }
      },
      addMessage: {
         type: MessageType,
         args: {
            user_id: {type: GraphQLString},
            message_content: {type: GraphQLString},
            message_date: {type: GraphQLInt},
         },
         resolve(parent, args) {
            let message = new Message({
               message_content: args.message_content,
               message_date: args.message_date,
               user_id: args.user_id,
            })
            return message.save();
         }
      }
   }
})

module.exports = new GraphQLSchema ({
   query: RootQuery,
   mutation: Mutation
})