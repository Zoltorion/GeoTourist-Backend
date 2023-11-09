import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } from "graphql";
import { addUser, login } from "./users.js";
import { deleteLocation, addLocation, updateLocation } from "./locations.js";
import { LocationType, LocationUpdateInputType } from "./graphQLObjects.js";

export const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All Mutation points',
    fields: () => ({
        addUser: {
            type: GraphQLString,
            description: 'Add a new non existing user to the users collection of the db',
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => addUser(args.email, args.username, args.password)
        },
        login: {
            type: GraphQLString, // You can use a String for returning a token or a session
            description: 'Authenticate User Login and return the Object ID on sucessful login',
            args: {
                emailOrUsername: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => login(args.emailOrUsername, args.password)
        },
        addLocation: {
            type: GraphQLString,
            description: 'Add a new location (won\'t accept any location that is in a 5km radius from an already existing location)',
            args: {
                user_id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                latitude: { type: GraphQLNonNull(GraphQLFloat) },
                longitude: { type: GraphQLNonNull(GraphQLFloat) },
            },
            resolve: (parent, args) => addLocation(args.user_id, args.name, args.latitude, args.longitude)
        },
        updateLocation: {
            type: LocationType,
            description: 'Update a selected location with new data',
            args: {
                _id: { type: GraphQLString },
                updatedData: { type: LocationUpdateInputType }
            },
            resolve: (parent, args) => updateLocation(args._id, args.updatedData)
        },
        deleteLocation: {
            type: GraphQLString,
            description: 'Remove entry based on the Object ID of the selected location',
            args: {
                _id: { type: GraphQLString }
            },
            resolve: (parent, args) => deleteLocation(args._id)
        }
    })
});