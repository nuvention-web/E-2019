const { ApolloServer, gql } = require('apollo-server-express');

const resolvers = require('./resolvers');

const schema = gql`
type User {
  id: String
  name: String
  photourl: String
}
type Journey {
  id: String
  name: String
}
type Query {
  findUser(email:String): User,
  findContactsId(journeyid:String, userid:String): [String],
  findContacts(journeyid:String, userid:String): [User],
  findUsersJourney(userid:String) : [Journey]
  helloword: String
}
`;


module.exports = new ApolloServer({
  typeDefs: schema,
  resolvers,
  uploads: false,
});