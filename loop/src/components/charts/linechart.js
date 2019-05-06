import React from "react";

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { myFirestore, myFirebase } from "../../firebase";
import axios from "axios";
import { getUserinfo } from "../../services/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
ReactFC.fcRoot(fusioncharts, charts, FusionTheme);

// Resolves charts dependancy
charts(fusioncharts);

const dataSource = {
  chart: {
    caption: "",
    yaxisname: "",
    anchorradius: "5",
    plottooltext:
      "<card><b>Response rate is <b>$value</b></card>",
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
    bgAlpha: "50"
  },
  data: []
};

class LineChart extends React.Component {
  state = {
    loadedChart: true
  };

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
    this.getChartData();
  }
  getChartData = async () => {
    console.log(this.props.friendid,this.props.user.id)
    if(this.props.friendid&&this.props.user.id){
      await axios
      .post(
        `https://loop-backend-server.herokuapp.com/api/loops/users/oneOneResponseRate`,
        {
          senderid: this.props.user.id,
          monthsAgo: 10,
          receiverid: this.props.friendid
        }
      )
      .then(res => {
        console.log(res);
        dataSource["data"] = res.data.monthly;
        this.setState({ loadedChart: false });
      });
    }
  };

  renderChart() {
    let viewChart = [];
    if (!this.state.loadedChart) {
      console.log("wht")
      viewChart.push(
        <ReactFC
          type="spline"
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

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserinfo
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineChart);
