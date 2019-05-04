import React from "react";

import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import axios from "axios";
import { myFirestore, myFirebase } from "../../firebase";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

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
      "<b>$displayValue</b> was <b>$columnlabel</b> in <b>$rowlabel</b>",
    valuefontcolor: "#262A44"
  },
  rows: {
    row: [
      {
        id: "2013",
        label: ""
      },
      {
        id: "2014",
        label: ""
      },
      {
        id: "2015",
        label: ""
      },
      {
        id: "2016",
        label: ""
      },
      {
        id: "2017",
        label: ""
      }
    ]
  },
  columns: {
    column: [
      {
        id: "1",
        label: "#1"
      },
      {
        id: "2",
        label: "#2"
      },
      {
        id: "3",
        label: "#3"
      },
      {
        id: "4",
        label: "#4"
      },
      {
        id: "5",
        label: "#5"
      },
      {
        id: "6",
        label: "#6"
      },
      {
        id: "7",
        label: "#7"
      },
      {
        id: "8",
        label: "#8"
      },
      {
        id: "9",
        label: "#9"
      },
      {
        id: "10",
        label: "#10"
      }
    ]
  },
  dataset: [
    {
      data: [
        {
          rowid: "2002",
          columnid: "1",
          value: "0",
          displayvalue: "Riley"
        },
        {
          rowid: "2003",
          columnid: "1",
          value: "24",
          displayvalue: "Riley"
        },
        {
          rowid: "2004",
          columnid: "1",
          value: "2",
          displayvalue: "Riley"
        },
        {
          rowid: "2005",
          columnid: "1",
          value: "25",
          displayvalue: "Riley"
        },
        {
          rowid: "2006",
          columnid: "1",
          value: "2",
          displayvalue: "Riley"
        },
        {
          rowid: "2007",
          columnid: "1",
          value: "24",
          displayvalue: "Riley"
        },
        {
          rowid: "2008",
          columnid: "1",
          value: "12",
          displayvalue: "Riley"
        },
        {
          rowid: "2009",
          columnid: "1",
          value: "10",
          displayvalue: "Riley"
        },
        {
          rowid: "2010",
          columnid: "1",
          value: "8",
          displayvalue: "Riley"
        },
        {
          rowid: "2011",
          columnid: "1",
          value: "9",
          displayvalue: "Riley"
        },
        {
          rowid: "2012",
          columnid: "1",
          value: "27",
          displayvalue: "Riley"
        },
        {
          rowid: "2013",
          columnid: "1",
          value: "6",
          displayvalue: "Riley"
        },
        {
          rowid: "2014",
          columnid: "1",
          value: "4",
          displayvalue: "Riley"
        },
        {
          rowid: "2015",
          columnid: "1",
          value: "11",
          displayvalue: "Riley"
        },
        {
          rowid: "2016",
          columnid: "1",
          value: "10",
          displayvalue: "Riley"
        },
        {
          rowid: "2017",
          columnid: "1",
          value: "3",
          displayvalue: "Riley"
        },
        {
          rowid: "2002",
          columnid: "2",
          value: "31",
          displayvalue: "Peyton"
        },
        {
          rowid: "2003",
          columnid: "2",
          value: "32",
          displayvalue: "Peyton"
        },
        {
          rowid: "2004",
          columnid: "2",
          value: "33",
          displayvalue: "Peyton"
        },
        {
          rowid: "2005",
          columnid: "2",
          value: "37",
          displayvalue: "Peyton"
        },
        {
          rowid: "2006",
          columnid: "2",
          value: "32",
          displayvalue: "Peyton"
        },
        {
          rowid: "2007",
          columnid: "2",
          value: "37",
          displayvalue: "Peyton"
        },
        {
          rowid: "2008",
          columnid: "2",
          value: "15",
          displayvalue: "Peyton"
        },
        {
          rowid: "2009",
          columnid: "2",
          value: "14",
          displayvalue: "Peyton"
        },
        {
          rowid: "2010",
          columnid: "2",
          value: "11",
          displayvalue: "Peyton"
        },
        {
          rowid: "2011",
          columnid: "2",
          value: "10",
          displayvalue: "Peyton"
        },
        {
          rowid: "2012",
          columnid: "2",
          value: "9",
          displayvalue: "Peyton"
        },
        {
          rowid: "2013",
          columnid: "2",
          value: "14",
          displayvalue: "Peyton"
        },
        {
          rowid: "2014",
          columnid: "2",
          value: "11",
          displayvalue: "Peyton"
        },
        {
          rowid: "2015",
          columnid: "2",
          value: "16",
          displayvalue: "Peyton"
        },
        {
          rowid: "2016",
          columnid: "2",
          value: "24",
          displayvalue: "Peyton"
        },
        {
          rowid: "2017",
          columnid: "2",
          value: "26",
          displayvalue: "Quinn"
        },
        {
          rowid: "2002",
          columnid: "3",
          value: "31",
          displayvalue: "Skyler"
        },
        {
          rowid: "2003",
          columnid: "3",
          value: "33",
          displayvalue: "Skyler"
        },
        {
          rowid: "2004",
          columnid: "3",
          value: "42",
          displayvalue: "Skyler"
        },
        {
          rowid: "2005",
          columnid: "3",
          value: "40",
          displayvalue: "Skyler"
        },
        {
          rowid: "2006",
          columnid: "3",
          value: "37",
          displayvalue: "Skyler"
        },
        {
          rowid: "2007",
          columnid: "3",
          value: "39",
          displayvalue: "Skyler"
        },
        {
          rowid: "2008",
          columnid: "3",
          value: "44",
          displayvalue: "Skyler"
        },
        {
          rowid: "2009",
          columnid: "3",
          value: "39",
          displayvalue: "Skyler"
        },
        {
          rowid: "2010",
          columnid: "3",
          value: "16",
          displayvalue: "Quinn"
        },
        {
          rowid: "2011",
          columnid: "3",
          value: "17",
          displayvalue: "Quinn"
        },
        {
          rowid: "2012",
          columnid: "3",
          value: "14",
          displayvalue: "Quinn"
        },
        {
          rowid: "2013",
          columnid: "3",
          value: "17",
          displayvalue: "Quinn"
        },
        {
          rowid: "2014",
          columnid: "3",
          value: "15",
          displayvalue: "Quinn"
        },
        {
          rowid: "2015",
          columnid: "3",
          value: "13",
          displayvalue: "Quinn"
        },
        {
          rowid: "2016",
          columnid: "3",
          value: "16",
          displayvalue: "Quinn"
        },
        {
          rowid: "2017",
          columnid: "3",
          value: "42",
          displayvalue: "Rowan"
        },
        {
          rowid: "2002",
          columnid: "4",
          value: "34",
          displayvalue: "Casey"
        },
        {
          rowid: "2003",
          columnid: "4",
          value: "32",
          displayvalue: "Casey"
        },
        {
          rowid: "2004",
          columnid: "4",
          value: "33",
          displayvalue: "Casey"
        },
        {
          rowid: "2005",
          columnid: "4",
          value: "32",
          displayvalue: "Casey"
        },
        {
          rowid: "2006",
          columnid: "4",
          value: "33",
          displayvalue: "Casey"
        },
        {
          rowid: "2007",
          columnid: "4",
          value: "41",
          displayvalue: "Quinn"
        },
        {
          rowid: "2008",
          columnid: "4",
          value: "41",
          displayvalue: "Quinn"
        },
        {
          rowid: "2009",
          columnid: "4",
          value: "35",
          displayvalue: "Quinn"
        },
        {
          rowid: "2010",
          columnid: "4",
          value: "37",
          displayvalue: "Skyler"
        },
        {
          rowid: "2011",
          columnid: "4",
          value: "11",
          displayvalue: "Emerson"
        },
        {
          rowid: "2012",
          columnid: "4",
          value: "15",
          displayvalue: "Emerson"
        },
        {
          rowid: "2013",
          columnid: "4",
          value: "17",
          displayvalue: "Emerson"
        },
        {
          rowid: "2014",
          columnid: "4",
          value: "18",
          displayvalue: "Emerson"
        },
        {
          rowid: "2015",
          columnid: "4",
          value: "21",
          displayvalue: "Emerson"
        },
        {
          rowid: "2016",
          columnid: "4",
          value: "44",
          displayvalue: "Rowan"
        },
        {
          rowid: "2017",
          columnid: "4",
          value: "12",
          displayvalue: "Peyton"
        },
        {
          rowid: "2002",
          columnid: "5",
          value: "31",
          displayvalue: "Justice"
        },
        {
          rowid: "2003",
          columnid: "5",
          value: "11",
          displayvalue: "Harley"
        },
        {
          rowid: "2004",
          columnid: "5",
          value: "45",
          displayvalue: "Jaime"
        },
        {
          rowid: "2005",
          columnid: "5",
          value: "35",
          displayvalue: "Quinn"
        },
        {
          rowid: "2006",
          columnid: "5",
          value: "36",
          displayvalue: "Quinn"
        },
        {
          rowid: "2007",
          columnid: "5",
          value: "32",
          displayvalue: "Casey"
        },
        {
          rowid: "2008",
          columnid: "5",
          value: "31",
          displayvalue: "Amari"
        },
        {
          rowid: "2009",
          columnid: "5",
          value: "33",
          displayvalue: "Amari"
        },
        {
          rowid: "2010",
          columnid: "5",
          value: "32",
          displayvalue: "Amari"
        },
        {
          rowid: "2011",
          columnid: "5",
          value: "36",
          displayvalue: "Skyler"
        },
        {
          rowid: "2012",
          columnid: "5",
          value: "33",
          displayvalue: "Skyler"
        },
        {
          rowid: "2013",
          columnid: "5",
          value: "31",
          displayvalue: "Skyler"
        },
        {
          rowid: "2014",
          columnid: "5",
          value: "11",
          displayvalue: "Finley"
        },
        {
          rowid: "2015",
          columnid: "5",
          value: "39",
          displayvalue: "Rowan"
        },
        {
          rowid: "2016",
          columnid: "5",
          value: "12",
          displayvalue: "Emerson"
        },
        {
          rowid: "2017",
          columnid: "5",
          value: "24",
          displayvalue: "Emerson"
        },
        {
          rowid: "2002",
          columnid: "6",
          value: "47",
          displayvalue: "Jaime"
        },
        {
          rowid: "2003",
          columnid: "6",
          value: "47",
          displayvalue: "Jaime"
        },
        {
          rowid: "2004",
          columnid: "6",
          value: "44",
          displayvalue: "Quinn"
        },
        {
          rowid: "2005",
          columnid: "6",
          value: "47",
          displayvalue: "Jaime"
        },
        {
          rowid: "2006",
          columnid: "6",
          value: "15",
          displayvalue: "Emerson"
        },
        {
          rowid: "2007",
          columnid: "6",
          value: "10",
          displayvalue: "Emerson"
        },
        {
          rowid: "2008",
          columnid: "6",
          value: "5",
          displayvalue: "Emerson"
        },
        {
          rowid: "2009",
          columnid: "6",
          value: "14",
          displayvalue: "Emerson"
        },
        {
          rowid: "2010",
          columnid: "6",
          value: "10",
          displayvalue: "Emerson"
        },
        {
          rowid: "2011",
          columnid: "6",
          value: "41",
          displayvalue: "Amari"
        },
        {
          rowid: "2012",
          columnid: "6",
          value: "38",
          displayvalue: "Rowan"
        },
        {
          rowid: "2013",
          columnid: "6",
          value: "38",
          displayvalue: "Rowan"
        },
        {
          rowid: "2014",
          columnid: "6",
          value: "41",
          displayvalue: "Rowan"
        },
        {
          rowid: "2015",
          columnid: "6",
          value: "10",
          displayvalue: "Finley"
        },
        {
          rowid: "2016",
          columnid: "6",
          value: "8",
          displayvalue: "Finley"
        },
        {
          rowid: "2017",
          columnid: "6",
          value: "8",
          displayvalue: "Finley"
        },
        {
          rowid: "2002",
          columnid: "7",
          value: "20",
          displayvalue: "Harley"
        },
        {
          rowid: "2003",
          columnid: "7",
          value: "44",
          displayvalue: "Quinn"
        },
        {
          rowid: "2004",
          columnid: "7",
          value: "18",
          displayvalue: "Harley"
        },
        {
          rowid: "2005",
          columnid: "7",
          value: "19",
          displayvalue: "Harley"
        },
        {
          rowid: "2006",
          columnid: "7",
          value: "47",
          displayvalue: "Jaime"
        },
        {
          rowid: "2007",
          columnid: "7",
          value: "36",
          displayvalue: "Rowan"
        },
        {
          rowid: "2008",
          columnid: "7",
          value: "39",
          displayvalue: "Casey"
        },
        {
          rowid: "2009",
          columnid: "7",
          value: "42",
          displayvalue: "Rowan"
        },
        {
          rowid: "2010",
          columnid: "7",
          value: "42",
          displayvalue: "Rowan"
        },
        {
          rowid: "2011",
          columnid: "7",
          value: "47",
          displayvalue: "Rowan"
        },
        {
          rowid: "2012",
          columnid: "7",
          value: "42",
          displayvalue: "Amari"
        },
        {
          rowid: "2013",
          columnid: "7",
          value: "10",
          displayvalue: "Finley"
        },
        {
          rowid: "2014",
          columnid: "7",
          value: "14",
          displayvalue: "Skyler"
        },
        {
          rowid: "2015",
          columnid: "7",
          value: "44",
          displayvalue: "Amari"
        },
        {
          rowid: "2016",
          columnid: "7",
          value: "44",
          displayvalue: "Amari"
        },
        {
          rowid: "2017",
          columnid: "7",
          value: "40",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2002",
          columnid: "8",
          value: "12",
          displayvalue: "Jessei"
        },
        {
          rowid: "2003",
          columnid: "8",
          value: 17,
          displayvalue: "Amari"
        },
        {
          rowid: "2004",
          columnid: "8",
          value: 12,
          displayvalue: "Amari"
        },
        {
          rowid: "2005",
          columnid: "8",
          value: "1",
          displayvalue: "Amari"
        },
        {
          rowid: "2006",
          columnid: "8",
          value: "20",
          displayvalue: "Harley"
        },
        {
          rowid: "2007",
          columnid: "8",
          value: "35",
          displayvalue: "Amari"
        },
        {
          rowid: "2008",
          columnid: "8",
          value: "37",
          displayvalue: "Rowan"
        },
        {
          rowid: "2009",
          columnid: "8",
          value: "36",
          displayvalue: "Cesay"
        },
        {
          rowid: "2010",
          columnid: "8",
          value: "9",
          displayvalue: "Finley"
        },
        {
          rowid: "2011",
          columnid: "8",
          value: "12",
          displayvalue: "Finley"
        },
        {
          rowid: "2012",
          columnid: "8",
          value: "9",
          displayvalue: "Finley"
        },
        {
          rowid: "2013",
          columnid: "8",
          value: "40",
          displayvalue: "Amari"
        },
        {
          rowid: "2014",
          columnid: "8",
          value: "40",
          displayvalue: "Amari"
        },
        {
          rowid: "2015",
          columnid: "8",
          value: "14",
          displayvalue: "Skyler"
        },
        {
          rowid: "2016",
          columnid: "8",
          value: "40",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2017",
          columnid: "8",
          value: "40",
          displayvalue: "Amari"
        },
        {
          rowid: "2002",
          columnid: "9",
          value: "46",
          displayvalue: "Quinn"
        },
        {
          rowid: "2003",
          columnid: "9",
          value: "32",
          displayvalue: "Justice"
        },
        {
          rowid: "2004",
          columnid: "9",
          value: "31",
          displayvalue: "Justice"
        },
        {
          rowid: "2005",
          columnid: "9",
          value: "1",
          displayvalue: "Sage"
        },
        {
          rowid: "2006",
          columnid: "9",
          value: "31",
          displayvalue: "Amari"
        },
        {
          rowid: "2007",
          columnid: "9",
          value: "47",
          displayvalue: "Jaime"
        },
        {
          rowid: "2008",
          columnid: "9",
          value: "31",
          displayvalue: "Justice"
        },
        {
          rowid: "2009",
          columnid: "9",
          value: "37",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2010",
          columnid: "9",
          value: "31",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2011",
          columnid: "9",
          value: "32",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2012",
          columnid: "9",
          value: "35",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2013",
          columnid: "9",
          value: "33",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2014",
          columnid: "9",
          value: "32",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2015",
          columnid: "9",
          value: "34",
          displayvalue: "Phoenix"
        },
        {
          rowid: "2016",
          columnid: "9",
          value: "11",
          displayvalue: "Harley"
        },
        {
          rowid: "2017",
          columnid: "9",
          value: "48",
          displayvalue: "Kyrie"
        },
        {
          rowid: "2002",
          columnid: "10",
          value: "23",
          displayvalue: "Sidney"
        },
        {
          rowid: "2003",
          columnid: "10",
          value: "31",
          displayvalue: "Jessie"
        },
        {
          rowid: "2004",
          columnid: "10",
          value: "2",
          displayvalue: "Sage"
        },
        {
          rowid: "2005",
          columnid: "10",
          value: "32",
          displayvalue: "Justice"
        },
        {
          rowid: "2006",
          columnid: "10",
          value: "34",
          displayvalue: "Justice"
        },
        {
          rowid: "2007",
          columnid: "10",
          value: "36",
          displayvalue: "Justice"
        },
        {
          rowid: "2008",
          columnid: "10",
          value: "5",
          displayvalue: "Harley"
        },
        {
          rowid: "2009",
          columnid: "10",
          value: "11",
          displayvalue: "Harley"
        },
        {
          rowid: "2010",
          columnid: "10",
          value: "34",
          displayvalue: "Casey"
        },
        {
          rowid: "2011",
          columnid: "10",
          value: "33",
          displayvalue: "Casey"
        },
        {
          rowid: "2012",
          columnid: "10",
          value: "12",
          displayvalue: "Harley"
        },
        {
          rowid: "2013",
          columnid: "10",
          value: "5",
          displayvalue: "Justice"
        },
        {
          rowid: "2014",
          columnid: "10",
          value: "4",
          displayvalue: "Harley"
        },
        {
          rowid: "2015",
          columnid: "10",
          value: "6",
          displayvalue: "Harley"
        },
        {
          rowid: "2016",
          columnid: "10",
          value: "17",
          displayvalue: "Skyler"
        },
        {
          rowid: "2017",
          columnid: "10",
          value: "24",
          displayvalue: "Harley"
        }
      ]
    }
  ],
  colorrange: {
    gradient: "1",
    minvalue: "0",
    code: "#FCFBFF",
    color: [
      {
        code: "#69A2FF",
        minvalue: "0",
        maxvalue: "10"
      },
      {
        code: "#DCE8F4",
        minvalue: "10",
        maxvalue: "20"
      },
      {
        code: "#FCD32A",
        minvalue: "20",
        maxvalue: "30"
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
      datasource : {}
    };
  }
  componentDidMount() {
      
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.getData()
    }
  }

  getData(){
      axios
      .get(
        `https://loop-backend-server.herokuapp.com/api/loops/users/heatmap`,
        {
          senderid: this.props.userid,
          timerange: "1_Y",
          journeyFriends: this.props.data.findContactsId
        }
      )
      .then(res => {
        this.setState({datasource: res.data});
      });
  }
  render() {
    return (
      <ReactFC
        type="heatmap"
        width="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}

export default graphql(
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
      }
    })
  }
)(HeatMap);
