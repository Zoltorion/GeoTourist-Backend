import { UserType, } from './graphQLObjects';
import { GraphQLString } from 'graphql';

describe('GraphQL Object Types', () => {
  it('UserType fields', () => {
    expect(UserType.getFields()).toHaveProperty('_id');
    expect(UserType.getFields()._id.type).toBeInstanceOf(GraphQLString);
  });
});
