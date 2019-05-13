import React from "react";

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import axios from "axios";
import { myFirestore, myFirebase } from "../../firebase";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { updateHeatMapData, getUserinfo, updateTouchPoints } from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from 'react-apollo';
import { withApollo } from 'react-apollo';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

let dataSource = {
  chart: {
    theme: "fusion",
    valuefontsize: "12",
    showlabels: "0",
    showvalues: "1",
    showplotborder: "1",
    placexaxislabelsontop: "1",
    mapbycategory: "0",
    showlegend: "1",
    plottooltext: "<b>$displayValue</b>‘s touchpoints are <b>$value</b>",
    valuefontcolor: "#262A44"
  },
  rows: {},
  columns: {},
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
        maxvalue: "1"
      },
      {
        code: "#DCE8F4",
        minvalue: "1",
        maxvalue: "2"
      },
      {
        code: "#FCD32A",
        minvalue: "2",
        maxvalue: "3",
        displayValue: "Warm"
      },
      {
        code: "#FEB0BA",
        minvalue: "3",
        maxvalue: "4"
      },
      {
        code: "#E57E7E",
        minvalue: "4",
        maxvalue: "10"
      }
    ]
  }
};

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: {},
      loading: true
    };
    this.contacts = [];
  }
  componentDidMount() {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUserinfo({
          id: user.uid,
          name: user.displayName,
          photourl: user.photoURL ? user.photoURL : ""
        });
      }
    });

    if (this.props.data.findContactsId&&this.props.data.findContacts) {
      this.getData();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({ loading: true });
      this.getData();
    }
  }

  getData = async () => {
    let contacts = this.props.data.findContacts;
    if (contacts && this.props.user.id) {
      let journeyFriends = contacts.reduce((a,c)=>{
        a.push(c.id)
        return a;
      },[]);
      await axios
        .post(
          `https://loop-backend-server.herokuapp.com/api/loops/users/heatmap`,
          {
            senderid: this.props.user.id,
            timerange: "1_Y",
            journeyFriends: journeyFriends
          }
        )
        .then(res => {
          // let result = dataSource;
          // result["rows"] = res.data.rows;
          // result["columns"] = res.data.columns;
          // result["dataset"] = res.data.dataset;
          dataSource["rows"] = res.data.rows;
          dataSource["columns"] = res.data.columns;
          let d = res.data.dataset;
          if (contacts.length > 0) {
            for (let i = 0; i < contacts.length; i++) {
              d[0]["data"][i]["displayvalue"] = contacts[i].name;
            }
            dataSource["dataset"] = d;
            // result["dataset"] = d;
            this.getTotaltp(d[0]["data"])
            // console.log(d[0]["data"][0].value);
            //this.props.updateHeatMapData(result);
            this.setState({ loading: false });
            //console.log(dataSource);
          }
        });
    }
  };

  getTotaltp(d){
    let tp = d.reduce((a,c)=>{
      a+=Number(c.value)
      return a
    },0)
    this.props.updateTouchPoints(tp)
  }

  renderMap() {
    let viewMap = [];
    if (!this.state.loading) {
      viewMap.push(
        <ReactFC
          key="1"
          type="heatmap"
          width="100%"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      );
      return viewMap;
    } else {
      return null;
    }
  }

  render() {
    return <div>{this.renderMap()}</div>;
  }
}
const mapStateToProps = state => {
  return { datasource: state.dataReducer.data, user: state.userReducer.user, tp: state.tpReducer.value};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateHeatMapData,
      getUserinfo,
      updateTouchPoints
    },
    dispatch
  );
};

export default 
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    (graphql(
      gql`
        query findContacts($journey_id: String, $user_id: String) {
          findContacts(journeyid: $journey_id, userid: $user_id) {
            id
            name
            email
            photourl
            type
            company
          }
        }
      `,
      {
        alias: 'withList',
        options: props => ({
          variables: {
            journey_id: props.journeyid,
            user_id: props.user.id
          }
        })
      }
    )),
    )(HeatMap);