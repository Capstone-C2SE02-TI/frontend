import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './SharkWalletsOverview.module.scss';
import SharkWalletsOverviewItem from '../../components/SharkWalletsOverviewItem/';
import { useSelector, useDispatch } from 'react-redux';
import { sharkCryptoStatusSelector, sharkRemainingSelector } from '~/modules/SharkWallet/selector';
import sharkWalletSlice, { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import NoData from '~/components/NoData';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounced } from '~/hooks';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import ReactPaginate from 'react-paginate';
import { sliceArrayToPagination } from '~/helpers';

const cx = classNames.bind(styles);
const NUMBER_ITEM_DISPLAY = 10;

function SharkWalletsOverview() {
    const dispatch = useDispatch();
    const sharksCoin = useSelector(sharkRemainingSelector);
    const status = useSelector(sharkCryptoStatusSelector);
    const userInfo = useSelector(userInfoSelector);
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        dispatch(fetchSharkWallet(currentUser.userId));
    }, [dispatch]);

    useEffect(() => {
        if (sharksCoin.length > 0) {
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(sharksCoin[0].sharkId));
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletAddress(sharksCoin[0].walletAddress));
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletTotalAssets(sharksCoin[0].totalAsset));
            dispatch(sharkWalletSlice.actions.actionSharkInfo(sharksCoin[0]));
        } else {
            dispatch(sharkWalletSlice.actions.actionSharkNoData(sharksCoin));
        }
    }, [dispatch, sharksCoin]);
    const [searchText, setSearchText] = useState('');

    const searchTextShark = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const textSearchDebounced = useDebounced(searchText, 500);
    useEffect(() => {
        dispatch(sharkWalletSlice.actions.searchFilterChange(textSearchDebounced));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textSearchDebounced]);
    const [paginationState, setPaginationState] = useState(1);
    const viewListSharkCoinPagination = sliceArrayToPagination(sharksCoin, paginationState, NUMBER_ITEM_DISPLAY);

    const handlePageClick = (selectedItem) => {
        setPaginationState(selectedItem.selected + 1);
    };

    return (
        <div>
            <div className={cx('shark-overview')}>
                <div className={cx('shark-search')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('container__search')}>
                            <input
                                ref={searchTextShark}
                                placeholder="Search by ID shark"
                                spellCheck="false"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search--icon')} />
                        </div>
                    </form>
                </div>
                <table className={cx('table-shark')}>
                    <thead>
                        <tr>
                            <th>Shark</th>
                            <th>Total assets</th>
                            <th>24%</th>
                            <th>Follow</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewListSharkCoinPagination
                            .slice()
                            .sort((prev, next) => {
                                if (
                                    prev.isFollowed === false &&
                                    next.isFollowed === true &&
                                    next.totalAssets - prev.totalAssets < 1
                                ) {
                                    return -1;
                                } else return 1;
                            })
                            // .filter((shark) => shark.totalAssets)
                            .map((sharkCoin) => (
                                <SharkWalletsOverviewItem
                                    data={sharkCoin}
                                    key={sharkCoin.sharkId}
                                    userInfo={userInfo}
                                />
                            ))}
                    </tbody>
                </table>

                {status !== 'loading' && sharksCoin.length === 0 && <NoData />}
            </div>
            <div id={cx('market-table__pagination')}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={cx('break-me')}
                    pageCount={Math.ceil(sharksCoin.length / NUMBER_ITEM_DISPLAY)}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    forcePage={paginationState - 1}
                    containerClassName={cx('pagination')}
                    activeClassName={cx('active')}
                />
            </div>
        </div>
    );
}

export default SharkWalletsOverview;
