const { ApolloServer, gql } = require('apollo-server-express');

const resolvers = require('./resolvers');

const schema = gql`
type User {
  id: String
  name: String
  email: String
  photourl: String
  type: String
  company: String
}
type Journey {
  id: String
  name: String
}
input Info{
  userid: String
  journeyid: String
  tp: Int
  arr: Int
}
input Friend {
  userid: String
  journeyid: String
  name: String
  email: String
  company: String
}

input Friend_new_Info{
  userid: String
  journeyid: String
  friendid: String
  name: String
  photourl: String
  email: String
  company: String
  jobtitle: String
  phonenumber: String
}

input Friend_del {
  userid: String
  friendid: String
  journeyid: String
}

input Log {
  id: String
  timestamp: String
  notes: String
  type: String
}
type returnInfo{
  tp: Int
  arr: Int
}

type Query {
  findUser(email:String): User,
  findContactsId(journeyid:String, userid:String): [String],
  findContacts(journeyid:String, userid:String): [User],
  findUsersJourney(userid:String) : [Journey],
  totalAllContacts(userid:String): Int,
  helloword: String
}
type Mutation {
  updateTPandARR(input: Info!): returnInfo,
  createFriend(input: Friend!): User,
  createLog(input: Log!): Boolean,
  deleteFriend(input: Friend_del!): Boolean,
  editFriend(input: Friend_new_Info!): Boolean
}
`;


module.exports = new ApolloServer({
  typeDefs: schema,
  resolvers,
  uploads: false,
});