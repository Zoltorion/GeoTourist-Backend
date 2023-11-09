import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './graphQLQueries.js';
import { RootMutationType } from './graphQLMutations.js';
import cors from 'cors';

const app = express();

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => console.log('Server Running'));