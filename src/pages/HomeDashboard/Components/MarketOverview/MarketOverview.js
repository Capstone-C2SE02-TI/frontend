import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './MarketOverview.module.scss';
import { marketOverviewService } from '~/services';
import CoinItem from './CoinItem';
import ReactPaginate from 'react-paginate';
import { Spin } from 'antd';
import Loading from '~/components/Loading';
const cx = classNames.bind(styles);

const PLUS_1 = 1;

function MarketOverview() {
    const [marketOverview, setMarketOverview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationState, setPaginationState] = useState(0);
    
    const handlePageClick = (selectedItem) => {
        setPaginationState(selectedItem.selected);
    };

    useEffect(() => {
        const fetchCoin = async () => {
            setLoading(true);
            const response = await marketOverviewService.getCoins(paginationState + PLUS_1);
        
            setMarketOverview(response.datas);

            setLoading(false);
        };
        fetchCoin();
    }, [paginationState]);
    
    
    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2>ACTIVITY</h2>
                <p>More Assets --&gt;</p>
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
