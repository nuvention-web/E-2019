import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: '',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(163,160,251,0.4)',
      borderColor: 'rgba(163,160,251,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(163,160,251,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(163,160,251,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0.5, 0.25, 0.5, 0.6, 0.5, 0.9]
    }
  ]
};



export default class LineExample extends React.Component{


    render() {
      return (
        <div>
          <Line data={data} 
          
         
          />
        </div>
      );
    }
  };