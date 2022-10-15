import classNames from 'classnames/bind';

import MarketOverviewDetail from './containers/MarketOverviewDetail/MarketOverviewDetail';
import TrendingCoins from './containers/TrendingCoins';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statusCoinDetailSelector, trendingCoinsSelector } from '~/modules/CoinDetail/selector';
import { fetchTrendingCoins } from '~/modules/CoinDetail/coinDetailSlice';
import styles from './Discover.modules.scss';

const cx = classNames.bind(styles);

function Discover() {
    const dispatch = useDispatch();

    const trendingCoins = useSelector(trendingCoinsSelector);
    const statusFetchCoinDetail = useSelector(statusCoinDetailSelector);

    useEffect(() => {
        dispatch(fetchTrendingCoins());
    }, [dispatch]);

    return (
        <section style={{ marginLeft: '30px' }}>
            <h3 className={cx('trending-title')}>Top Trending Coins</h3>
            { trendingCoins.length > 0 &&<TrendingCoins loading={statusFetchCoinDetail} data={trendingCoins} />}
            <MarketOverviewDetail />
        </section>
    );
}

export default Discover;
