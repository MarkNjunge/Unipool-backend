const {
  makeExecutableSchema
} = require('graphql-tools');
const {
  mergeTypes
} = require('merge-graphql-schemas');

const resolvers = require('./resolver').resolvers;
const UserTypeDefs = require('./types/user/schema').typeDefs;

const baseTypeDefs = `
schema {
  query: Query
  mutation: Mutation
}
`;

const schema = makeExecutableSchema({
  typeDefs: mergeTypes([baseTypeDefs, UserTypeDefs]),
  resolvers
});

module.exports = {
  schema
};