import classNames from 'classnames/bind';
import styles from './MarketOverviewDetail.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CoinItem from './CoinItem';
import Loading from '~/components/Loading';
import sliceArrayToPagination from '~/helpers/sliceArrayToPagination';
import discoverSlice, { fetchCoinsDiscover, fetchListTagsName } from '~/modules/Discover/discoverSlice';
import {
    coinsRemainingSelector,
    listTagsNameSelector,
    statusCoinsSelector,
    tagnameTextSelector,
} from '~/modules/Discover/selector';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useDebounced, useOnclickOutSide, useScrollToTop } from '~/hooks';
import WrapperMenu from '~/components/WrapperMenu/WrapperMenu';
import { Fragment } from 'react';
import NoData from '~/components/NoData';

const cx = classNames.bind(styles);
const NUMBER_ITEM_DISPLAY = 10;

function MarketOverviewDetail() {
    const [searchText, setSearchText] = useState('');
    const [paginationState, setPaginationState] = useState(1);
    const [noData, setNodata] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const inputUserRef = useRef();
    const refFilterCategory = useRef();
    const refParenFilterCategory = useRef();

    const dispatch = useDispatch();

    const textSearchDebounced = useDebounced(searchText, 200);

    const tagNameCurrent = useSelector(tagnameTextSelector);
    const coinsList = useSelector(coinsRemainingSelector);
    const listTagsName = useSelector(listTagsNameSelector);
    const statusFetchListCoins = useSelector(statusCoinsSelector);

    const viewListCoinsPagination = sliceArrayToPagination(coinsList, paginationState, NUMBER_ITEM_DISPLAY);
    const selectedTagnameClassNames = cx('market-box__category--filter--container', {
        'selected-item': tagNameCurrent,
    });

    useScrollToTop();
    useEffect(() => {
        dispatch(fetchListTagsName());
        dispatch(fetchCoinsDiscover());
    }, [dispatch]);

    useEffect(() => {
        statusSearchData();

        if (textSearchDebounced) {
            dispatch(discoverSlice.actions.searchFilterChange(textSearchDebounced));
        } else dispatch(discoverSlice.actions.searchFilterChange(''));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textSearchDebounced, coinsList, tagNameCurrent]);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClear = () => {
        inputUserRef.current.value = '';
        setSearchText('');
    };

    const statusSearchData = () => {
        if ((textSearchDebounced && coinsList.length === 0) || (tagNameCurrent && coinsList.length === 0)) {
            setNodata(true);
        } else {
            setNodata(false);
        }
    };

    const handlePageClick = (selectedItem) => {
        setPaginationState(selectedItem.selected + 1);
    };

    const handleToggleFilter = () => {
        setOpenFilter(!openFilter);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    useOnclickOutSide(refFilterCategory, (e) => {
        if (!refParenFilterCategory.current.contains(e.target)) {
            setOpenFilter(false);
        }
    });

    const renderFilterCategory = () => {
        return (
            <div className={cx('market-box__category')}>
                <div
                    onClick={handleToggleFilter}
                    ref={refParenFilterCategory}
                    className={cx('market-box__category--filter', { closing: !openFilter })}
                >
                    {tagNameCurrent ? (
                        <div className={selectedTagnameClassNames}>
                            <p>{tagNameCurrent}</p>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    ) : (
                        <div className={selectedTagnameClassNames}>
                            <p>All Categories</p>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    )}
                </div>
                {openFilter && (
                    <div className={cx('market-box-content-filter')} ref={refFilterCategory}>
                        <WrapperMenu
                            data={listTagsName}
                            onRequestClose={handleCloseFilter}
                            itemSelected={tagNameCurrent}
                        />
                    </div>
                )}
            </div>
        );
    };

    const renderSearch = () => {
        return (
            <div className={cx('market-content__search')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search--icon')} />
                <input
                    ref={inputUserRef}
                    type="text"
                    onChange={handleChange}
                    value={searchText}
                    placeholder="Search your coin"
                    spellCheck="false"
                />
                {searchText && (
                    <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} className={cx('active-value')} />
                )}
            </div>
        );
    };

    const renderTable = () => {
        return (
            <Fragment>
                <table className={cx('tableDiscover')}>
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
                        {viewListCoinsPagination.length > 0 &&
                            viewListCoinsPagination.map((coin, index) => (
                                <CoinItem
                                    key={index}
                                    index={index}
                                    data={coin}
                                    increaseStatus24h={coin.usd.percentChange24h > 0 ? true : false}
                                    increaseStatus7d={coin.usd.percentChange7d > 0 ? true : false}
                                />

                            ))}

                        <Loading loading={viewListCoinsPagination.length === 0} />
                    </tbody>
                </table>
                {noData && <NoData searchText={searchText} tagNameCurrent={tagNameCurrent} type={'Category '} />}
            </Fragment>
        );
    };

    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2> </h2>
            </div>
            <div className={cx('market-box')}>
                {renderFilterCategory()}
                {renderSearch()}
            </div>
            <nav className={cx('statisticsOverview')}>
                <div className={cx('row')}>
                    <div className={cx('talbeScroll')}>
                        {renderTable()}

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
