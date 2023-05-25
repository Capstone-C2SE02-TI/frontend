import { Col, Row, Select } from 'antd';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TokenDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TokenDetailEachCoin from './containers/TokenDetailEachCoin';
import { fetchCoinsDetail, fetchTrendingTokens } from '~/modules/CoinDetail/coinDetailSlice';
import { coinsDetailSelector, statusCoinDetailSelector, trendingTokensSelector } from '~/modules/CoinDetail/selector';
import TrendingTokens from './containers/TrendingTokens/TrendingTokens';
import { useParams } from 'react-router-dom';
import { useScrollToTop } from '~/hooks';

import ChartCoinDetail from '~/pages/ChartCoinDetail/ChartCoinDetail';
import DetailEachCoinSkeleton from './containers/TokenDetailEachCoin/DetailEachCoinSkeleton';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import ChartIndicator from './containers/ChartIndicator/ChartIndicator';
import { symbols } from '~/data/symbols';
import { ChartComponent } from './ChartTest';
import { useMemo } from 'react';

const cx = classNames.bind(styles);
const FILTERS_CHART_DATA = ['Day', 'Month', 'Year'];
const SYMBOLS_DATA = symbols;
const FILTERS_CHART_DATA_CHART = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
function TokenDetail() {
  const [filterChartByTime, setFilterChartByTime] = useState('day');
  const [filterChartBySymbol, setFilterChartBySymbol] = useState();
  const [filterIndicatorData, setFilterIndicatorData] = useState({
    time: '1m',
    period: '7',
    type: ['candlestick'],
  });
  const [isFilterIndicator, setIsFilterIndicator] = useState({
    timePeriod: '',
    typeChart: '',
  });
  const dispatch = useDispatch();
  const [candlestick, setCandlestick] = useState([]);
  const [candlestickLastUpdate, setCandlestickLastUpdate] = useState([]);
  const [prediction, setPrediction] = useState([])
  const [predictionFilter, setPredictionFilter] = useState('2014')
  const { symbol } = useParams();

  const statusFetchCoinDetail = useSelector(statusCoinDetailSelector);
  const coinDetail = useSelector(coinsDetailSelector);
  const trendingTokens = useSelector(trendingTokensSelector);
  useScrollToTop();

  useEffect(() => {
    dispatch(fetchCoinsDetail(symbol));
    window.scrollTo(0, 0);
  }, [dispatch, symbol]);

  useEffect(() => {
    dispatch(fetchTrendingTokens());
  }, [dispatch]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/display/indicators?symbol=${symbol.toUpperCase()}USDT&interval=${filterIndicatorData.time
      }&period=${filterIndicatorData.period}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCandlestick(data.data);
      });
  }, []);
  useEffect(() => {
    if (isFilterIndicator) {
      fetch(
        `http://localhost:4000/display/indicators?symbol=${symbol.toUpperCase()}USDT&interval=${filterIndicatorData.time
        }&period=${filterIndicatorData.period}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setCandlestickLastUpdate(data.data);
        });
    }
  }, [filterIndicatorData.time, filterIndicatorData.period]);
  const handleFilterChart = (time) => {
    setFilterChartByTime(time);
  };

  const handleFilterChartPre = (time) => {
    setPredictionFilter(time)
    handleResetZoom()
  }

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await fetch(`/prediction/${symbol.toUpperCase()}`).then((response) => response.json()).then((data) => {
        setPrediction(data.prediction)
      }
      )
      const result = await response.json();
    }
    fetchChartData()
  }, [])

  const canvasRef = useRef();

  const handleResetZoom = () => {
    if (canvasRef && canvasRef.current) {
      canvasRef.current.resetZoom();
    }
  };
  const onChange = (value) => {
    setFilterChartBySymbol(value);
  };

  const onSearch = (value) => {
    setFilterChartBySymbol(value);
  };

  const onChangeFilterIndicatorData = (key, value) => {
    if (key === 'type') {
      setFilterIndicatorData({
        ...filterIndicatorData,
        [key]: [...filterIndicatorData.type, value],
      });
    }

    if (key === 'all') {
      setFilterIndicatorData({
        ...filterIndicatorData,
        type: ['candlestick', ...value],
      });
    }
    else {
      setFilterIndicatorData({
        ...filterIndicatorData,
        [key]: value,
      });
    }

    setIsFilterIndicator({
      timePeriod: value,
    });
  };
  const chartContainerRef = useRef();


  return (
    <div className={cx('wrapper')}>
      <Loading loading={statusFetchCoinDetail === 'loading'} />
      <div className={cx('wallet-bottom-container')}>
        <div className={cx('wallet-content-statics')}>
          <Row>
            <Col xl={18} lg={18} md={24}>
              {coinDetail ? (
                <TokenDetailEachCoin
                  data={coinDetail}
                // community={[
                //     ...coinDetail.urls.announcement_url,
                //     ...coinDetail.urls.subreddit_url,
                //     // ...coinDetail.urls.messageBoard,
                //     ...coinDetail.urls.announcement_url,
                // ]}
                />
              ) : (
                <DetailEachCoinSkeleton />
              )}
              <div className={cx('wallet-chart')}>
                <div className="d-flex justify-content-between" style={{ textAlign: 'right', padding: '16px' }}>
                  <Select defaultValue={FILTERS_CHART_DATA[0]} style={{ width: 120 }} onChange={handleFilterChart}>
                    {FILTERS_CHART_DATA.map((time) => (
                      <Select.Option key={time.toLowerCase()}>{time}</Select.Option>
                    ))}
                  </Select>
                  <Select defaultValue={FILTERS_CHART_DATA_CHART[0]} style={{ width: 120 }} onChange={handleFilterChartPre}>
                    {FILTERS_CHART_DATA_CHART.map((time) => (
                      <Select.Option key={time.toLowerCase()}>{time}</Select.Option>
                    ))}
                  </Select>
                  <div>
                    <Button outline onClick={handleResetZoom}>
                      Reset Zoom
                    </Button>
                  </div>
                </div>
                <div>
                  {coinDetail && coinDetail.prices.day && prediction.length > 0 ? (
                    // <ChartCoinDetail
                    //   time={filterChartByTime.toLowerCase()}
                    //   symbol={coinDetail.symbol}
                    //   data={coinDetail}
                    //   typeFilter={filterChartByTime}
                    //   canvasRef={canvasRef}
                    //   // onResetZoom = {handleResetZoom}
                    // />
                    <ChartComponent
                      canvasRef={canvasRef}
                      prediction={prediction}
                      filter={predictionFilter}
                      symbol={symbol}
                    ></ChartComponent>
                    // <span>ádasd</span>

                  ) : (
                    <h2>Chart</h2>
                  )}
                </div>
              </div>
              {/* <Select
                showSearch
                placeholder="Select a symbol"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                defaultValue={SYMBOLS_DATA[0].symbol}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={SYMBOLS_DATA.map((d) => ({ label: d.symbol, value: d.symbol }))}
              /> */}
            </Col>
            <Col xl={6} lg={6} md={0}>
              <TrendingTokens data={trendingTokens} />
            </Col>
          </Row>
          <div>
            {candlestick.length > 0 && (
              <ChartIndicator
                onChangeFilterIndicatorData={onChangeFilterIndicatorData}
                candlestickLastUpdate={candlestickLastUpdate}
                candlestick={candlestick}
                isFilterIndicator={isFilterIndicator}
                filterIndicatorData={filterIndicatorData}
              />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default TokenDetail;
