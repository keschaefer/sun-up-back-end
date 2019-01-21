const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql

const UserType = new GraphQLObjectType ({
   name: 'User',
   fields: () => ({
      id: {type: GraphQLString},
      name_full: {type: GraphQLString},
      org_name: {type: GraphQLString},
   })
})