import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const get_a_user = gql`
query findUser($email: String) {
    findUser(email: $email) {
      id,
      name,
      photourl
    }
  }
`

export const get_a_User_by_email = (email) => (
    <Query query={get_a_user} variables={{ email }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
          if(data) console.log(data)
        return (
          <p key={data.findUser.id} value={data.findUser.name}>{data.findUser.name}</p>)
  
      }}
    </Query>
  );