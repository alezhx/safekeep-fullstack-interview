import React from 'react';
import Chart from 'react-apexcharts'

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: props.userData.map(user=>user.hours),
      options: {
        legend: {
          position: 'top',
          fontSize: 16
        },
        dataLabels: {
          style: {
            fontSize: 20
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '45%'
            }
          }
        },
        labels: props.userData.map(user => `${user.firstName} ${user.lastName}`),
      },
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userData !== this.props.userData) {
      let series = this.props.userData.map(user=>user.hours)
      let labels = this.props.userData.map(user => `${user.firstName} ${user.lastName}`)
      this.setState(prevState => {
        return {
          ...prevState,
          series,
          options: {
            ...prevState.options,
            labels,
          }
        }
      })
    }
  }

  render() {
    return (
      <div>
        <Chart 
          options={this.state.options} 
          series={this.state.series} 
          type="donut"
        />
      </div>
    );
  }
}

export default PieChart