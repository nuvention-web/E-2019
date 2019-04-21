import React, { Component } from "react";
import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

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
    centerlabel: "# Users: $value",
    theme: "gammel"
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
  render() {
    return (
      <ReactFusioncharts
        type="doughnut2d"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}
