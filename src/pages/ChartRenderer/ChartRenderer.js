import React from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

const ChartRenderer = () => {
  const chartRef = React.useRef();

  React.useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: 600,
      height: 400,
      layout: {
        backgroundColor: '#F5F5F5',
        textColor: '#696969',
      },
      // crosshair: {
      //   mode: CrosshairMode.Normal,
      // },
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.1,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const firstSeries = chart.addLineSeries({
      title: 'First Series',
      color: 'blue',
    });
    firstSeries.setData([
      { time: '2021-01-01', value: 100 },
      { time: '2021-01-02', value: 150 },
      { time: '2021-01-03', value: 120 },
      { time: '2021-01-04', value: 170 },
      { time: '2021-01-05', value: 130 },
    ]);

    const secondSeries = chart.addLineSeries({
      title: 'Second Series',
      color: 'red',
      priceScaleId: 'right',
    });
    secondSeries.setData([
      { time: '2021-01-01', value: 10 },
      { time: '2021-01-02', value: 15 },
      { time: '2021-01-03', value: 12 },
      { time: '2021-01-04', value: 17 },
      { time: '2021-01-05', value: 13 },
    ]);
  }, []);

  return (
    <div
    ref={chartRef}
    >

    </div>
  )
};

export default ChartRenderer;

