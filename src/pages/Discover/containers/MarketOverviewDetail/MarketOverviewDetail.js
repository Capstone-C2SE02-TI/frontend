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
            <div className="d-flex align-items-center ">
                <div className={cx('market-box__category')}>
                    <div
                        onClick={handleToggleFilter}
                        ref={refParenFilterCategory}
                        className={cx('market-box__category--filter', { closing: !openFilter })}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#A6B0C3"
                            height="24px"
                            width="24px"
                            viewBox="0 0 24 24"
                            style={{ marginRight: '10px' }}
                            className="sc-aef7b723-0 fKbUaI"
                        >
                            <path d="M21.288 8.9542L15.3871 8.05451L12.7512 2.44829C12.6745 2.31177 12.5653 2.19861 12.4342 2.11998C12.3031 2.04136 12.1547 2 12.0037 2C11.8527 2 11.7043 2.04136 11.5732 2.11998C11.442 2.19861 11.3328 2.31177 11.2561 2.44829L8.61526 8.05451L2.7143 8.9542C2.56041 8.9775 2.41581 9.04551 2.29684 9.15053C2.17786 9.25555 2.08927 9.3934 2.04106 9.54849C1.99286 9.70358 1.98697 9.86973 2.02406 10.0281C2.06115 10.1866 2.13975 10.3309 2.25095 10.4449L6.52188 14.8113L5.51436 20.978C5.4881 21.1388 5.50524 21.3041 5.56384 21.4552C5.62244 21.6063 5.72017 21.7372 5.84597 21.8331C5.97177 21.9289 6.12063 21.986 6.27571 21.9977C6.4308 22.0095 6.58592 21.9755 6.72355 21.8996L12.0012 18.9889L17.2788 21.8996C17.4164 21.9755 17.5715 22.0095 17.7266 21.9977C17.8817 21.986 18.0305 21.9289 18.1563 21.8331C18.2822 21.7372 18.3799 21.6063 18.4385 21.4552C18.4971 21.3041 18.5142 21.1388 18.488 20.978L17.4804 14.8113L21.7514 10.4449C21.8625 10.331 21.9412 10.1868 21.9783 10.0285C22.0155 9.87024 22.0098 9.7042 21.9617 9.54915C21.9137 9.39411 21.8254 9.25624 21.7066 9.1511C21.5878 9.04597 21.4434 8.97777 21.2897 8.9542H21.288Z" />
                        </svg>
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
                {/* <div className={cx('spread')}></div> */}
            </div>
        );
    };

    // const renderListTabItemFilter = () => {
    //     return (
    //         <div className={cx('list-tab-item-filter')}>
    //             <div>
    //                 <button>Các loại tiền điện tử</button>
    //             </div>
    //             <div>
    //                 <button>Các loại tiền điện tử</button>
    //             </div>
    //             <div>
    //                 <button>Các loại tiền điện tử</button>
    //             </div>
    //         </div>
    //     );
    // }

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
                            <th>Last 1 Month</th>
                        </tr>
                    </thead>

                    <tbody className={cx('listCoin')}>
                        {viewListCoinsPagination.length > 0 &&
                            viewListCoinsPagination
                                .slice()
                                .sort((prev, next) => Number(next.usd.price) - Number(prev.usd.price))
                                .map((coin, index) => (
                                    <CoinItem
                                        index={index}
                                        key={index}
                                        data={coin}
                                        increaseStatus24h={coin.usd.percentChange24h > 0 ? true : false}
                                        increaseStatus7d={coin.usd.percentChange7d > 0 ? true : false}
                                    />
                                ))}

                        {!searchText && !tagNameCurrent && <Loading loading={viewListCoinsPagination.length === 0} />}
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
                {/* {renderListTabItemFilter()} */}
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
                                pageCount={Math.ceil(coinsList.length / NUMBER_ITEM_DISPLAY)}
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
