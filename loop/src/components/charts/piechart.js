import React, { Component } from "react";
import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { myFirestore, myFirebase } from "../../firebase";
import axios from "axios";
ReactFC.fcRoot(fusioncharts, charts, FusionTheme);

// Resolves charts dependancy
charts(fusioncharts);

const dataSource = {
  chart: {
    caption: "",
    subcaption: "",
    showpercentvalues: "1",
    defaultcenterlabel: "",
    aligncaptionwithcanvas: "0",
    captionpadding: "0",
    decimals: "1",
    plottooltext:
      "",
    centerlabel: "# : $value",
    theme: "fusion"
  },
  data: [
    {
      label: "E-mail",
      value: "7"
    },
    {
      label: "Chat",
      value: "3"
    },
    {
      label: "In-person",
      value: "6"
    },
    {
      label: "Social Media",
      value: "4"
    },
  ]
};

export default class PieChart extends React.Component {
  state = {
    loadedChart: true
  };

  componentDidMount() {
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getChartData(user.uid);
      }
    });
    
  }


  getChartData= async (id) =>{
    if(this.props.friendid&&id){
      await axios
      .post(
        `https://loop-backend-server.herokuapp.com/api/loops/users/pieChart`,
        {
          senderid: id,
          start_rel: "1_Y",
          receiverid: this.props.friendid
        }
      )
      .then(res => {
        dataSource["data"] = res.data.data;
        this.setState({ loadedChart: false });
      });
    }
  }

  renderChart(){
    let viewChart = [];
    if (!this.state.loadedChart) {
      viewChart.push(
        <ReactFC
        key="1"
        type="doughnut2d"
        width="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
      );
      return viewChart;
    }else{
      return null;
    }
  }

  render() {
    return <div>{this.renderChart()}</div>;
  }
}
