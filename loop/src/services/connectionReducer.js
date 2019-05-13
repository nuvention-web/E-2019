import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import Card from "../components/connections/card";
const get_contacts= gql`
query findContacts($journeyid:String, $userid:String) {
    findContacts(journeyid:$journeyid, userid:$userid) {
      id
      name
      email
      photourl
      type
      company
    }
  }
`

export const get_userByJourney = (journeyid,userid,history) => (
    <Query query={get_contacts} variables={{ journeyid,userid }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
          if(data) {
            if(data.findContacts===null)
              return<p>No Result</p>
            else
              return (
                <Card data={data.findContacts} history={history}/>
               
                )}
  
      }}
    </Query>
  );