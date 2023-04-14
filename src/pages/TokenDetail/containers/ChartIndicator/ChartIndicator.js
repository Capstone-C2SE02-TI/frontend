import { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { createChart } from 'lightweight-charts';
import { useRef } from 'react';
import styles from './ChartIndicator.module.scss';

function ChartIndicator({ candlestick, isFilterSymbol }) {
  const chartRef = useRef();
  useEffect(() => {
    renderChart();
  }, [candlestick]);

  const renderChart = () => {
    if (candlestick.length > 0) {
      const chartProperties = {
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
        pane: 0,
      };

      const chart = createChart(chartRef.current, chartProperties);

      //Candlestick
      const candleSeries = chart.addCandlestickSeries();
      const klineData = candlestick;
      candleSeries.setData(klineData);

      //   //SMA
        const smaSeries = chart.addLineSeries({ color: 'red', lineWidth: 1 });
        const sma_data = candlestick.filter((d) => d.sma).map((d) => ({ time: d.time, value: d.sma }));
        smaSeries.setData(sma_data);

        //EMA
        const emaSeries = chart.addLineSeries({ color: 'green', lineWidth: 1 });
        const ema_data = candlestick.filter((d) => d.ema).map((d) => ({ time: d.time, value: d.ema }));
        emaSeries.setData(ema_data);
        //Markers
        candleSeries.setMarkers(
          candlestick
            .filter((d) => d.long || d.short)
            .map((d) =>
              d.long
                ? {
                    time: d.time,
                    position: 'belowBar',
                    color: 'green',
                    shape: 'arrowUp',
                    text: 'LONG',
                  }
                : {
                    time: d.time,
                    position: 'aboveBar',
                    color: 'red',
                    shape: 'arrowDown',
                    text: 'SHORT',
                  },
            ),
        );

    //   RSI
    //   const rsi_series = chart.addLineSeries({
    //   	color: 'purple',
    //   	lineWidth: 1,
    //   	pane: 1,
    //     });
    //   const rsi_data = candlestick
    //   	.filter((d) => d.rsi)
    //   	.map((d) => ({ time: d.time, value: d.rsi }));
    //   rsi_series.setData(rsi_data);

      //MACD FAST
      // const macd_fast_series = chart.addLineSeries({
      // 	color: 'blue',
      // 	lineWidth: 1,
      // 	pane: 2,
      // });
      // const macd_fast_data = candlestick
      // 	.filter((d) => d.macd_fast)
      // 	.map((d) => ({ time: d.time, value: d.macd_fast }));
      // 	macd_fast_series.setData(macd_fast_data);
    }
  };

  return (
    <div className={styles.chartcontainer}>
		<h3 className={styles.heading}>Indicators TradingView</h3>
      <div id={styles.tvchart} ref={chartRef}></div>
    </div>
  );
}
export default memo(ChartIndicator);
