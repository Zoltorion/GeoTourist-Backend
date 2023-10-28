import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLList
} from 'graphql';

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a users credentials',
    fields: () => ({
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

export const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'This represents a location added by the user',
    fields: () => ({
        user_id: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: PointType },
        elevation: { type: GraphQLInt },
        avg_temp: { type: GraphQLFloat },
        koppen: { type: GraphQLString },
        climate_zone: { type: GraphQLString }
    })
});

export const PointType = new GraphQLObjectType({
    name: 'Coordinate',
    description: 'This represents a single Coordinate',
    fields: () => ({
        latitude: { type: GraphQLNonNull(GraphQLFloat) },
        longitude: { type: GraphQLNonNull(GraphQLFloat) }
    })
});

export const PointInputType = new GraphQLInputObjectType({
    name: 'CoordinateInput',
    description: 'This represents a single Coordinate Input',
    fields: () => ({
        type: { type: GraphQLNonNull(GraphQLString) }, // if no type given MongoServer cannot recognize GeoJSON object
        coordinates: { type: GraphQLList(GraphQLFloat) } // pair of coordinates in GeoJSON format, longitude then latitude
    })
});

export const LocationUpdateInputType = new GraphQLInputObjectType({
    name: 'LocationInput',
    description: 'This is used for updating a Location',
    fields: () => ({
        name: { type: GraphQLString },
        location: { type: PointInputType }
    })
});