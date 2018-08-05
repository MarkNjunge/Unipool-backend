const {
    makeExecutableSchema,
    addMockFunctionsToSchema
} = require('graphql-tools')
const { mergeTypes, fileLoader } = require('merge-graphql-schemas')
const path = require('path')

const resolvers = require('./resolver')

const typesArray = fileLoader(path.join(__dirname, '**/*.graphql'), {
    recursive: true
})

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(typesArray),
    resolvers
})

// addMockFunctionsToSchema({schema, mocks})

module.exports = schema
