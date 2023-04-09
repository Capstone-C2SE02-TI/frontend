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

const cx = classNames.bind(styles);
const FILTERS_CHART_DATA = ['Day', 'Month', 'Year'];

function TokenDetail() {
    const [filterChartByTime, setFilterChartByTime] = useState('day');
    const dispatch = useDispatch();
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

    const handleFilterChart = (time) => {
        setFilterChartByTime(time);
    };

  

    const canvasRef = useRef();
    const handleResetZoom = () => {
        if (canvasRef && canvasRef.current) {
            canvasRef.current.resetZoom();
        }
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
                                <div
                                    className="d-flex justify-content-between"
                                    style={{ textAlign: 'right', padding: '16px' }}
                                >
                                    <Select
                                        defaultValue={FILTERS_CHART_DATA[0]}
                                        style={{ width: 120 }}
                                        onChange={handleFilterChart}
                                    >
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
                        </Col>
                        <Col xl={6} lg={6} md={0}>
                            <TrendingTokens data={trendingTokens} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TokenDetail;
