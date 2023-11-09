import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { findUser, queryUsers, findUsersByField } from './users.js';
import { queryLocations, queryLocationsByName } from './locations.js';
import { UserType, LocationType } from './graphQLObjects.js';

export const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'All query points',
    fields: () => ({
        user: {
            type: UserType,
            description: 'Returns a single specific user depending on their details',
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => findUser(args.email, args.username)
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'Returns a list of all the users',
            resolve: () => queryUsers()
        },
        userByField: {
            type: new GraphQLList(UserType),
            description: 'Returns users matching a partial search from a specific field',
            args: {
                field: { type: GraphQLNonNull(GraphQLString) },
                value: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => findUsersByField(args.field, args.value)
        },
        locations: {
            type: new GraphQLList(LocationType),
            description: 'Returns a list of all locations added by a specific user',
            args: {
                user_id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => queryLocations(args.user_id)
        },
        locationsByName: {
            type: new GraphQLList(LocationType),
            description: 'Returns a list of all locations by a user that contains the arg in its name',
            args: {
                user_id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString }
            },
            resolve: (parent, args) => queryLocationsByName(args.user_id, args.name)
        }
    })
});