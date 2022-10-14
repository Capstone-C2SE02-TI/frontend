import { Col, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './TokenDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Option } from 'antd/lib/mentions';

import P2P from '../P2P';
import TokenDetailEachCoin from './components/TokenDetailEachCoin';
import { fetchCoinsDetail, fetchTrendingCoins, fetchTrendingTokens } from '~/modules/CoinDetail/coinDetailSlice';
import { coinsDetailSelector, statusCoinDetailSelector, trendingCoinsSelector, trendingTokensSelector } from '~/modules/CoinDetail/selector';
import TrendingCoins from './Containers/TrendingCoins/TrendingCoins';
import TrendingTokens from './Containers/TrendingTokens/TrendingTokens';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const FILTERS_CHART_DATA = ['Day', 'Month', 'Year'];

function TokenDetail() {
    const dispatch = useDispatch();
    const { symbol } = useParams();

    const statusFetchCoinDetail = useSelector(statusCoinDetailSelector);
    const coinDetail = useSelector(coinsDetailSelector);
    const trendingTokens = useSelector(trendingTokensSelector);


 const trendingCoins = useSelector(trendingCoinsSelector);

 useEffect(() => {
 }, [dispatch]);
    useEffect(() => {
        dispatch(fetchCoinsDetail(symbol));
        dispatch(fetchTrendingTokens());
     dispatch(fetchTrendingCoins());

    }, [dispatch, symbol]);

    const handleFilterChart = (time) => {};
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wallet-top-container')}>{<TrendingCoins loading={statusFetchCoinDetail} data={trendingCoins} />}</div>
            <div className={cx('wallet-bottom-container')}>
                <div className={cx('wallet-content-statics')}>
                    <Row>
                        <Col span={17}>
                            {coinDetail && <TokenDetailEachCoin data={coinDetail} />}
                            <div className={cx('wallet-chart')}>
                                <div style={{ textAlign: 'right', padding: '16px' }}>
                                    <Select
                                        defaultValue={FILTERS_CHART_DATA[0]}
                                        style={{ width: 120 }}
                                        onChange={handleFilterChart}
                                    >
                                        {FILTERS_CHART_DATA.map((time) => (
                                            <Option key={time}>{time}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <div>{statusFetchCoinDetail === 'idle' && coinDetail && <P2P data={coinDetail} />}</div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <TrendingTokens loading={statusFetchCoinDetail} data={trendingTokens} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TokenDetail;
