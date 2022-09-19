import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MarketOverview.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import axios from 'axios';

const cx = classNames.bind(styles);

function MarketOverview() {
    const [coins, setCoins] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [coinsPerPage, setCoinsPerPage] = useState(10);

    useEffect(() => {
        const fetchCoin = async () => {
            // setLoading(true);
            const response = await axios.get('http://localhost:4000/display/coins');
            console.log(response.data.coins)
            setCoins(response.data.coins)
            // setLoading(false)
        }
        fetchCoin();
    }, []);



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
                    <div>
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
                                {
                                    coins.map((coin, index) => (
                                        
                                        <tr key={index}>
                                            <td>
                                                {index+1}
                                            </td>
                                            <td className={cx('priceCoin')}>
                                                <Image width="20" className={cx('imageCoin')} src={images.etherium} alt="logo" />
                                                <span>{coin.name}{coin.symbol}</span>
                                            </td>
                                            <td>$1,454.91</td>
                                            <td>{coin.usd.percentChange24h}</td>
                                            <td>{coin.usd.percentChange7d}</td>
                                            <td>{coin.usd.volume24h}</td>
                                            <td>{coin.marketCap}</td>
                                            <td>{coin.circulatingSupply}</td>
                                            <td>...</td>
                                            <td>
                                                <FontAwesomeIcon className={cx('iconFollow')} icon={faStar} />
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <Pagination coinsPerPage={coinsPerPage} totalCoins={coins.length}/> */}
                </div>
            </nav>
        </section>
    )
}

export default MarketOverview;