import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from '../MarketOverviewDetail/MarketOverviewDetail.module.scss';
import CoinItem from './CoinItem';
import Loading from '~/components/Loading';
import sliceArrayToPagination from '~/helpers/sliceArrayToPagination';
import discoverSlice, { fetchCoinsDiscover } from '~/modules/Discover/discoverSlice';
import { coinsRemainingSelector, statusCoinsSelector } from '~/modules/Discover/selector';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Nodata } from '~/components/Icons';
import useDebounced from '~/hooks';

const cx = classNames.bind(styles);


const NUMBER_ITEM_DISPLAY = 10;

function MarketOverviewDetail() {
    const [searchText, setSearchText] = useState('');
    const [paginationState, setPaginationState] = useState(1);
    const [noData, setNodata] = useState(false);

    const inputUserRef = useRef();

    const dispatch = useDispatch();
    //searchText a 
    const textSearchDebounced = useDebounced(searchText, 200);

    const coinsList = useSelector(coinsRemainingSelector);
    const status = useSelector(statusCoinsSelector);
    const viewListCoinsPagination = sliceArrayToPagination(coinsList, paginationState, NUMBER_ITEM_DISPLAY);

    useEffect(() => {
        dispatch(fetchCoinsDiscover());
    }, [dispatch]);

    useEffect(() => {
        statusSearchData();

        if (textSearchDebounced) {
            dispatch(discoverSlice.actions.searchFilterChange(textSearchDebounced));
        } else dispatch(discoverSlice.actions.searchFilterChange(''));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textSearchDebounced, coinsList]);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClear = () => {
        inputUserRef.current.value = '';
        setSearchText('');
    };

    const statusSearchData = () => {
        if (textSearchDebounced && coinsList.length === 0) {
            setNodata(true);
        } else {
            setNodata(false);
        }
    };

    const handlePageClick = (selectedItem) => {
        setPaginationState(selectedItem.selected + 1);
    };

    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2>ACTIVITY</h2>
            </div>
            <div className={cx('market-box')}>
                <div className={cx('market-box__category')}>
                    <p>Category</p>
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className={cx('market-content__search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search--icon')} />
                    <input
                        ref={inputUserRef}
                        type="text"
                        onChange={handleChange}
                        value={searchText}
                        placeholder="Search your coin"
                    />
                    {searchText && (
                        <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} className={cx('active-value')} />
                    )}
                </div>
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
                                {status === 'idle' &&
                                    viewListCoinsPagination.map((coin, index) => (
                                        <CoinItem
                                            index={index}
                                            key={coin.id}
                                            data={coin}
                                            increaseStatus={coin.usd.percentChange24h > 0 ? true : false}
                                        />
                                    ))}

                                {status === 'loading' && <Loading />}
                            </tbody>
                        </table>
                        {noData && (
                            <div className={cx('no-data')}>
                                <Nodata className={cx('no-data__icon')} />
                                <div className={cx('no-data__title')}>
                                    Không có kết quả nào cho <span>"{searchText}"</span>
                                </div>
                            </div>
                        )}

                        <div id={cx('market-table__pagination')}>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={cx('break-me')}
                                pageCount={coinsList.length / NUMBER_ITEM_DISPLAY}
                                marginPagesDisplayed={3}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                forcePage={searchText ? 0 : paginationState - 1}
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

export default MarketOverviewDetail;
