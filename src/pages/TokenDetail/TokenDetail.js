import { Col, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './TokenDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TokenDetailEachCoin from './containers/TokenDetailEachCoin';
import { fetchCoinsDetail, fetchTrendingTokens } from '~/modules/CoinDetail/coinDetailSlice';
import { coinsDetailSelector, statusCoinDetailSelector, trendingTokensSelector } from '~/modules/CoinDetail/selector';
import TrendingTokens from './containers/TrendingTokens/TrendingTokens';
import { useParams } from 'react-router-dom';
import useScrollToTop from '~/hooks/useScrollToTop';
import  ChartCoinDetail  from '~/pages/ChartCoinDetail/ChartCoinDetail';
import DetailEachCoinSkeleton from './containers/TokenDetailEachCoin/DetailEachCoinSkeleton';

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
        dispatch(fetchTrendingTokens());
    }, [dispatch, symbol]);

    const handleFilterChart = (time) => {
        setFilterChartByTime(time);
    };

    //    sm={8} xs={12}
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wallet-bottom-container')}>
                <div className={cx('wallet-content-statics')}>
                    <Row>
                        <Col xl={18} lg={18} md={24}>
                            {coinDetail ? (
                                <TokenDetailEachCoin
                                    data={coinDetail}
                                    community={[
                                        ...coinDetail.urls.announcement,
                                        ...coinDetail.urls.reddit,
                                        ...coinDetail.urls.messageBoard,
                                    ]}
                                />
                            ) : (
                                <DetailEachCoinSkeleton />
                            )}
                            <div className={cx('wallet-chart')}>
                                <div style={{ textAlign: 'right', padding: '16px' }}>
                                    <Select
                                        defaultValue={FILTERS_CHART_DATA[0]}
                                        style={{ width: 120 }}
                                        onChange={handleFilterChart}
                                    >
                                        {FILTERS_CHART_DATA.map((time) => (
                                            <Select.Option key={time.toLowerCase()}>{time}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    {coinDetail && coinDetail.prices ? (
                                        <ChartCoinDetail
                                            time={filterChartByTime.toLowerCase()}
                                            symbol={coinDetail.symbol}
                                            data={coinDetail}
                                            typeFilter={filterChartByTime}
                                        />
                                    ) : (
                                        <h2>Chart</h2>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={0}>
                            <TrendingTokens loading={statusFetchCoinDetail} data={trendingTokens} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TokenDetail;
