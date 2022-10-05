import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './MarketOverview.module.scss';
import { marketOverviewService } from '~/services';
import CoinItem from './CoinItem';
import ReactPaginate from 'react-paginate';
import Loading from '~/components/Loading';
import sliceArrayToPagination from '~/helpers/sliceArrayToPagination';
const cx = classNames.bind(styles);

const NUMBER_ITEM_DISPLAY = 10;

function MarketOverview() {
    const [marketOverviews, setMarketOverviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationState, setPaginationState] = useState(1);
    const handlePageClick = (selectedItem) => {
        setPaginationState(selectedItem.selected + 1);
    };

    useEffect(() => {
        const fetchCoin = async () => {
            setLoading(true);
            const response = await marketOverviewService.getCoins();
            setMarketOverviews(response.datas);
            setLoading(false);
        };
        fetchCoin();
    }, []);

    console.log("test");
    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2>ACTIVITY</h2>
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
                                    <th>Last 1 day</th>
                                </tr>
                            </thead>

                            <tbody className={cx('listCoin')}>
                                {!loading &&
                                        sliceArrayToPagination(marketOverviews, paginationState, NUMBER_ITEM_DISPLAY)
                                        .map((coin, index) => <CoinItem index={index} key={coin.id} data={coin} />)}
                                {loading && <Loading />}
                            </tbody>
                        </table>
                        <div id={cx('market-table__pagination')}>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={cx('break-me')}
                                pageCount={ marketOverviews.length / NUMBER_ITEM_DISPLAY}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                forcePage={paginationState - 1}
                                containerClassName={cx('pagination')}
                                activeClassName={cx('active')}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default MarketOverview;
