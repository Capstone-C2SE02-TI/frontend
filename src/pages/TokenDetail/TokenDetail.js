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

const cx = classNames.bind(styles);
const FILTERS_CHART_DATA = ['Day', 'Month', 'Year'];
const SYMBOLS_DATA = symbols;

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
      `http://localhost:4000/display/indicators?symbol=${symbol.toUpperCase()}USDT&interval=${
        filterIndicatorData.time
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
        `http://localhost:4000/display/indicators?symbol=${symbol.toUpperCase()}USDT&interval=${
          filterIndicatorData.time
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
    
    if(key === 'all') {
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
                  <div>
                    <Button outline onClick={handleResetZoom}>
                      Reset Zoom
                    </Button>
                  </div>
                </div>
                <div>
                  {coinDetail && coinDetail.prices.day ? (
                    <ChartCoinDetail
                      time={filterChartByTime.toLowerCase()}
                      symbol={coinDetail.symbol}
                      data={coinDetail}
                      typeFilter={filterChartByTime}
                      canvasRef={canvasRef}
                      // onResetZoom = {handleResetZoom}
                    />
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
