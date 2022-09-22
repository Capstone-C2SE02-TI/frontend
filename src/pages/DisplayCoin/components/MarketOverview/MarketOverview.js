import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './MarketOverview.module.scss';
import { marketOverviewService } from '~/services';
import CoinItem from './CoinItem';
import ReactPaginate from 'react-paginate';
import { Spin } from 'antd';

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
            // const response = await marketOverviewService.getCoin(paginationState + PLUS_1);
            // // console.log({ response });
            // setMarketOverview(response.coins);
            setTimeout(() => {
                
            }, 5000);
            // setCoins(response.data.coins)
            setLoading(false);
        };
        fetchCoin();
    }, [paginationState]);

    return (
        <section className={cx('colMiddle')}>
            <nav className={cx('statisticsOverview')}>
                <marquee direction="right">
                    <ul>
                        <li>
                            Số lượng nhà đầu tư: <span>1,915</span>
                        </li>
                        <li>
                            Tổng số tài sản: <span>$87,951,754,765</span>
                        </li>
                        <li>
                            Tổng số giao dịch 24h: <span>4,138</span>
                        </li>
                        <li>
                            Tổng giá trị các giao dịch 24h: <span>$2,590,054,160</span>
                        </li>
                    </ul>
                </marquee>
                <div className={cx('row')}>
                    <div className={cx('headFilter')}>
                        <div className={cx('headFilterH2')}>
                            <h2>ETH</h2>
                        </div>
                        <div className={cx('search')}>
                            <input placeholder="search" type="text"></input>
                        </div>
                        <select className={cx('filter')}>
                            <option>Filter by price</option>
                            <option>Filter by alphabet</option>
                        </select>
                    </div>
                    <div className={cx('talbeScroll')}>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Cryptor</th>
                                    <th>PRICE</th>
                                    <th>24H %</th>
                                    <th>7D %</th>
                                    <th>24H VOLUME</th>
                                    <th>MARKET CAP</th>
                                    <th>CIRCULATING SUPPLY</th>
                                    <th>LAST 7 DAYS</th>
                                    <th>FOLLOW</th>
                                </tr>
                            </thead>
                            <tbody className={cx('listCoin')}>
                                {loading ? (
                                    <Spin tip="Loading..."> </Spin>
                                ) : (
                                    marketOverview.map((coin, index) => (
                                        <CoinItem index={index} key={coin.id} data={coin} />
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div id={cx('market-table__pagination')}>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={cx('break-me')}
                                pageCount={marketOverview.totalPage || 10}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                forcePage={paginationState}
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
