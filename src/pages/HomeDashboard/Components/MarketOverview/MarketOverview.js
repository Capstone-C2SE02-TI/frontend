import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from '../MarketOverview/MarketOverview.module.scss';
import { marketOverviewService } from '~/services';
import CoinItem from './CoinItem';

import Loading from '~/components/Loading';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const PAGE_SIZE = 1;

function MarketOverview() {
    const [marketOverview, setMarketOverview] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchCoin = async () => {
            setLoading(true);
            const response = await marketOverviewService.getCoins(PAGE_SIZE);
        
            setMarketOverview(response.datas);

            setLoading(false);
        };
        fetchCoin();
    }, []);
    
    
    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2>ACTIVITY</h2>
                <Link to="/discover"><p>More token --&gt;</p></Link>
            </div>
            <nav className={cx('statisticsOverview')}>
                <div className={cx('row')}>
                    <div className={cx('talbeScroll')}>
                        <table>
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


                                {!loading && marketOverview.map((coin, index) => (
                                    <CoinItem index={index} key={coin.id} data={coin} />
                                ))}
                                {loading && (
                                    <Loading />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default MarketOverview;
