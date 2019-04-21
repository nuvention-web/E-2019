import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'E-mail',
		'chat',
        'In-person',
        'Social-Media',
	],
	datasets: [{
		data: [7, 3, 6,4],
		backgroundColor: [
		'rgb(85,216,254)',
		'rgb(255,131,155)',
        'rgb(255,218,131)',
        'rgb(163,160,251)',
		],
		hoverBackgroundColor: [
        'rgb(85,216,254)',
        'rgb(255,131,155)',
        'rgb(255,218,131)',
        'rgb(163,160,251)',
		]
	}]
};

export default class PieExample extends React.Component{


  render() {
    return (
      <div>
        <Doughnut data={data} />
      </div>
    );
  }
};