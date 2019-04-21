import React from 'react';

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(fusioncharts);

const dataSource = {
  chart: {
    caption: "",
    yaxisname: "",
    anchorradius: "5",
    plottooltext: "Touchpoint<br /><b>Email</b>:2<br />Response Rate: 50%<br/><b>Social Media</b>: 1<br />Response Rate: 100%<br />Suggestion:<br />Send him an article<br />Invite him for a coffee ",
    showhovereffect: "1",
    showvalues: "0",
    numbersuffix: "%",
    theme: "fusion",
    anchorbgcolor: "#A3A0FB",
    palettecolors: "#A3A0FB",
    numdivlines: "3",
    adjustDiv: "0",
    showBorder: "0",
    plotColorinTooltip: "0",
    borderAlpha: "0",
    borderColor: "#FFFFFF",
    borderThickness: "0",
    bgColor: "#FFFFFF",
    bgAlpha: "0"
  },
  data: [
    {
      label: "Jan",
      value: "50"
    },
    {
      label: "Feb",
      value: "25"
    },
    {
      label: "Mar",
      value: "50"
    },
    {
      label: "Apr",
      value: "60"
    },
    {
      label: "May",
      value: "50"
    },
    {
      label: "Jun",
      value: "90"
    },
  ]
};

export default class LineChart extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="spline"
        width='100%'
        height='50%'
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}
