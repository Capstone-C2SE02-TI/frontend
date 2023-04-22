import { memo, useEffect } from 'react';
import { useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useRef } from 'react';
import styles from './ChartIndicator.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const HEIGHT = 300;
const TIME_FILTER = [
  {
    type: 'period',
    value: '7',
    label: '7 period',
  },
  {
    type: 'period',
    value: '21',
    label: '21 period',
  },
  {
    type: 'time',
    value: '1m',
    label: '1 Day',
  },
  {
    type: 'time',
    value: '15m',
    label: '7 Day',
  },
  {
    type: 'time',
    value: '30m',
    label: '30 Day',
  },
];

const CHART_FILTER = ['sma', 'ema', 'rsi', 'markers', 'macd'];
function ChartIndicator({
  filterIndicatorData,
  candlestick,
  isFilterIndicator,
  candlestickLastUpdate,
  onChangeFilterIndicatorData,
}) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { symbol } = useParams();

  const elRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const smaSeries = useRef();
  const emaSeries = useRef();
  const rsiSeries = useRef();
  const macdFastSeries = useRef();
  const macdSlowSeries = useRef();
  const macdHistogramSeries = useRef();
  useEffect(() => {
    renderChart(candlestick);

    return () => chartRef.current.remove();
  }, [candlestick]);

  const renderChart = (data) => {
    console.log(data);
    chartRef.current = createChart(elRef.current, {
      leftPriceScale: {
        visible: true,
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },
      height: 400,
    });

    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries();
    candlestickSeriesRef.current.setData(data);

    //SMA
    if (isCheck.includes('sma')) {
      smaSeries.current = chartRef.current.addLineSeries({ color: 'red', lineWidth: 0 });
      const sma_data = data.filter((d) => d.sma).map((d) => ({ time: d.time, value: d.sma }));
      smaSeries.current.setData(sma_data);
    }

    //EMA
    if (isCheck.includes('ema')) {
      emaSeries.current = chartRef.current.addLineSeries({ color: 'green', lineWidth: 0 });
      const ema_data = data.filter((d) => d.ema).map((d) => ({ time: d.time, value: d.ema }));
      emaSeries.current.setData(ema_data);
    }

    //RSI
    if (isCheck.includes('rsi')) {
      rsiSeries.current = chartRef.current.addLineSeries({ color: 'purple', lineWidth: 1, priceScaleId: 'secondary' });
      const rsi_data = data.filter((d) => d.rsi).map((d) => ({ time: d.time, value: d.rsi }));
      rsiSeries.current.setData(rsi_data);
    }

    //MARKERS
    if (isCheck.includes('markers')) {
      candlestickSeriesRef.current.setMarkers(
        data
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
    }

    if (isCheck.includes('macd')) {
      //MACD FAST
      macdFastSeries.current = chartRef.current.addLineSeries({ color: 'blue', lineWidth: 1,priceScaleId: 'high' });
      const macd_fast_data = data.filter((d) => d.macd_fast).map((d) => ({ time: d.time, value: d.macd_fast }));
      macdFastSeries.current.setData(macd_fast_data);

      //MACD SLOW
      macdSlowSeries.current = chartRef.current.addLineSeries({ color: 'red', lineWidth: 1,priceScaleId: 'high' });
      const macd_slow_series = data.filter((d) => d.macd_slow).map((d) => ({ time: d.time, value: d.macd_slow }));
      macdSlowSeries.current.setData(macd_slow_series);

      //MACD HISTOGRAM
      macdHistogramSeries.current = chartRef.current.addHistogramSeries({priceScaleId: 'high' });
      const macd_histogram_data = data
        .filter((d) => d.macd_histogram)
        .map((d) => ({
          time: d.time,
          value: d.macd_histogram,
          color: d.macd_histogram > 0 ? 'green' : 'red',
        }));
      macdHistogramSeries.current.setData(macd_histogram_data);
    }
  };
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.remove();
      renderChart(candlestickLastUpdate);
    }
  }, [isFilterIndicator.timePeriod, candlestickLastUpdate, isCheck]);

  useEffect(() => {
    const handler = () => {
      chartRef.current.resize(elRef.current.offsetWidth, HEIGHT);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(CHART_FILTER.map((li) => li));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <div className={styles.chartcontainer}>
      <div className={styles.filter}>
        <div className={styles.period}>
          {TIME_FILTER.map((timer, index) => (
            <p
              key={index}
              className={cx(
                filterIndicatorData.period === timer.value || filterIndicatorData.time === timer.value ? 'active' : '',
              )}
              onClick={() => onChangeFilterIndicatorData(timer.type, timer.value)}
            >
              <button>{timer.label}</button>
            </p>
          ))}
        </div>
        <div className={styles.time}>
          <p className={cx('active')}>
            <button>CANDLESTICK</button>
          </p>
        </div>
        <div className={styles.time}>
          {CHART_FILTER.map((typeChart, index) => (
            <div className={cx('time-check')} key={index}>
              <label className={cx('checkbox-container')}>
                <input type="checkbox" id={typeChart} onChange={(e) => handleClick(e, 'type', typeChart)} checked={isCheck.includes(typeChart)} />
                <div className={cx('checkmark')} />
              </label>
              <p
                key={index}
                className={cx(isCheck.includes(typeChart) ? 'active' : '')}
              >
                <button>{typeChart.toUpperCase()}</button>
              </p>
            </div>
          ))}
          <div className={cx('time-check')}>
            <label className={cx('checkbox-container')}>
              <input type="checkbox" id="selectAll" onChange={handleSelectAll} checked={isCheckAll} />
              <div className={cx('checkmark')} />
            </label>
            <p>
              <button>All</button>
            </p>
          </div>
        </div>
      </div>
      <h3 className={styles.heading}>Indicators TradingView({symbol})</h3>
      <div id={styles.tvchart} ref={elRef}></div>
    </div>
  );
}
export default memo(ChartIndicator);
