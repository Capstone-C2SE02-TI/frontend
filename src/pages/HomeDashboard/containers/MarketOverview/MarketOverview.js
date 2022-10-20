import classNames from 'classnames/bind';
import { useEffect } from 'react';
import styles from '../MarketOverview/MarketOverview.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import CoinItem from './CoinItem';
import Loading from '~/components/Loading';
import { Link } from 'react-router-dom';
import { CaretNextIcon } from '~/components/Icons';
import {  statusCoinDetailSelector } from '~/modules/CoinDetail/selector';
import { fetchTrendingCoins } from '~/modules/Discover/discoverSlice';
import { trendingCoinsSelector } from '~/modules/Discover/selector';
const cx = classNames.bind(styles);


function MarketOverview() {

    const dispatch = useDispatch();
    const trendingCoins = useSelector(trendingCoinsSelector);
    const status = useSelector(statusCoinDetailSelector);

    useEffect(() => {
        dispatch(fetchTrendingCoins());
    }, [dispatch]);
    

    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2>ACTIVITY</h2>
                <Link to="/discover">
                    <p>
                        More token
                        <CaretNextIcon className={cx('caret-next')} />
                    </p>
                </Link>
            </div>
            <nav className={cx('statisticsOverview')}>
                <div className={cx('row')}>
                    <div className={cx('talbeScroll')}>
                        <table className={cx('table-home__dashboard')}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>24h %</th>
                                    <th>7d %</th>
                                    <th>Market Cap</th>
                                    <th>Volume(24h)</th>
                                    <th>Circulating Supply</th>
                                </tr>
                            </thead>

                            <tbody className={cx('listCoin')}>
                                {status === 'idle' &&
                                    trendingCoins.map((coin, index) => (
                                        <CoinItem
                                            index={index}
                                            key={coin.id}
                                            data={coin}
                                            increaseStatus24h={coin.usd.percentChange24h > 0 ? true : false}
                                            increaseStatus7d={coin.usd.percentChange7d > 0 ? true : false}
                                        />
                                    ))}

                                {status === 'loading' && <Loading />}
                            </tbody>
                        </table>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default MarketOverview;
