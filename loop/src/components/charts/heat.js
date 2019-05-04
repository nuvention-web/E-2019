import React from "react";

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import axios from "axios";
import { myFirestore, myFirebase } from "../../firebase";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { updateHeatMapData} from "../../services/actions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const dataSource = {
  chart: {
    theme: "fusion",
    valuefontsize: "12",
    showlabels: "0",
    showvalues: "1",
    showplotborder: "1",
    placexaxislabelsontop: "1",
    mapbycategory: "0",
    showlegend: "1",
    plottooltext:
      "<b>$displayValue</b>‘s touchpoints are <b>$value</b>",
    valuefontcolor: "#262A44"
  },
  rows: {},
  columns:{},
  dataset: [],
  colorrange: {
    gradient: "1",
    minvalue: "0",
    startlabel: "Coldest",
    endlabel: "Hottest",
    code: "#69A2FF",
    color: [
      {
        code: "#69A2FF",
        minvalue: "0",
        maxvalue: "10",
      },
      {
        code: "#DCE8F4",
        minvalue: "10",
        maxvalue: "20"
      },
      {
        code: "#FCD32A",
        minvalue: "20",
        maxvalue: "30",
        displayValue: "Warm"
      },
      {
        code: "#FEB0BA",
        minvalue: "30",
        maxvalue: "40"
      },
      {
        code: "#E57E7E",
        minvalue: "40",
        maxvalue: "50"
      }
    ]
  }
};

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource : {},
      loading: true,
      
    };
    this.contacts = []
  }
  componentDidMount() {
      this.getContactsName()
      // console.log(this.props.data)
      if(this.props.data.findContactsId){
        this.getData()
      }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.getData()
    }
  }

  getContactsName = async () =>{
    var user = myFirebase.auth().currentUser;
    if(user){
      const contacts= await myFirestore
      .collection("user")
      .doc(user.uid)
      .collection("journeys")
      .doc(this.props.journeyid)
      .collection("contacts")
      .get();
  if (contacts.docs.length>0){
   this.contacts = contacts.docs.reduce((a,c) => {
     a.push(c.data().name)
     return a;
   }, [])
}
    }
    
}

  getData(){
    let contacts = this.contacts
    if(this.state.loading&&this.props.data.findContactsId){
      axios
      .post(
        `https://loop-backend-server.herokuapp.com/api/loops/users/heatmap`,
        {
          senderid: this.props.userid,
          timerange: "1_Y",
          journeyFriends: this.props.data.findContactsId
        }
      )
      .then(res => {
        let result = {}
        result["rows"] = res.data.rows;
        result["columns"] = res.data.columns;
        dataSource["rows"] = res.data.rows;
        dataSource["columns"] = res.data.columns;
        let d = res.data.dataset;
        if (contacts.length>0){
          for(let i = 0;i<contacts.length;i++){
            d[0]["data"][i]["displayvalue"] = contacts[i]
          }
          dataSource["dataset"] = d;
          result["dataset"] = d;
          this.setState({loading: false}); 
        }
        
      });
    }
      
  };

  render() {
    return (
      <div>
      {!this.state.loading? (<ReactFC
        type="heatmap"
        width="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />): null}</div>
      
    );
  }
}
const mapStateToProps = state => {
  return { data: state.dataReducer.data };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateHeatMapData
    },
    dispatch
  );
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(
  gql`
    query ($journeyid: String, $userid: String) {
      findContactsId(journeyid: $journeyid, userid: $userid)
    }
  `,
  {
    options: props => ({
      variables: {
        journeyid: props.journeyid,
        userid: props.userid
      },
      fetchPolicy:'no-cache'
    })
  }
)(HeatMap)));
