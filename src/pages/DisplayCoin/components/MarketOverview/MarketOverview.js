import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MarketOverview.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import PaginationCoin from './Pagination';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

function MarketOverview() {
    // const [coins, setCoins] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [coinsPerPage, setCoinsPerPage] = useState(10);

    // useEffect(() => {
    //     const fetchCoin = async () => {
    //         // setLoading(true);
    //         const response = await axios.get('http://localhost:4000/display/coins');
    //         console.log(response.data.coins)
    //         setCoins(response.data.coins)
    //         // setLoading(false)
    //     }
    //     fetchCoin();
    // }, []);

    return (
        <section className={cx('colMiddle')}>
            <nav className={cx('statisticsOverview')}>
                <marquee direction="right">
                    <ul>
                        <li>Số lượng nhà đầu tư: <span>1,915</span></li>
                        <li>Tổng số tài sản: <span>$87,951,754,765</span></li>
                        <li>Tổng số giao dịch 24h: <span>4,138</span></li>
                        <li>Tổng giá trị các giao dịch 24h: <span>$2,590,054,160</span></li>
                    </ul>
                </marquee>
                <div className={cx('row')}>
                    <div className={cx('headFilter')}>
                        <div className={cx('headFilterH2')}>
                            <h2>ETH</h2>
                        </div>
                        <div className={cx('search')}>
                            <input placeholder='search' type='text'></input>
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
                            <tbody className={cx("listCoin")}>
                                <PaginationCoin />
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        total={85}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        defaultPageSize={20}
                        defaultCurrent={1}
                    />
                </div>
            </nav>
        </section>
    )
}

export default MarketOverview;