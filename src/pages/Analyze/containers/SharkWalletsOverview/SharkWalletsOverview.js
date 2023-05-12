import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './SharkWalletsOverview.module.scss';
import SharkWalletsOverviewItem from '../../components/SharkWalletsOverviewItem/';
import { useSelector, useDispatch } from 'react-redux';
import { newSharkListRemainingSelector, newSharkQuantitySelector, sharkCryptoStatusSelector, sharkRemainingSelector } from '~/modules/SharkWallet/selector';
import sharkWalletSlice, { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import NoData from '~/components/NoData';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounced } from '~/hooks';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import ReactPaginate from 'react-paginate';
import { sliceArrayToPagination } from '~/helpers';
import { useMemo } from 'react';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';

const cx = classNames.bind(styles);
const NUMBER_ITEM_DISPLAY = 40;

function SharkWalletsOverview() {
    const dispatch = useDispatch();
    const sharksCoin = useSelector(sharkRemainingSelector);
    const newSharkList = useSelector(newSharkListRemainingSelector);
    const newSharkQuantity = useSelector(newSharkQuantitySelector);

    const status = useSelector(sharkCryptoStatusSelector);
    const userInfo = useSelector(userInfoSelector);
    const ethAddress = localStorage.getItem('eth_address');

    useEffect(() => {
        dispatch(fetchSharkWallet(ethAddress));
    }, [dispatch, ethAddress]);

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
    const [tabOverviewTransaction, setTabOverviewTransaction] = useState('oldShark');

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

    const viewListSharkCoinPagination = useMemo(() => {
        console.log(sharksCoin);
        const sharksFollowed = sharksCoin.slice().sort((a, b) => b.isFollowed? 1 : -1)
        if (tabOverviewTransaction === 'oldShark') {
            return sliceArrayToPagination(sharksFollowed, paginationState, NUMBER_ITEM_DISPLAY);
        } else {
            return sliceArrayToPagination(newSharkList, paginationState, NUMBER_ITEM_DISPLAY);
        }
    }, [newSharkList, paginationState, sharksCoin, tabOverviewTransaction]);

    const handlePageClick = (selectedItem) => {
        setPaginationState(selectedItem.selected + 1);
    };

    const allSharkClassName = useMemo(() => {
        return cx('tab-shark', { 'active-shark': tabOverviewTransaction === 'oldShark' });
    }, [tabOverviewTransaction]);

    const newSharkClassName = useMemo(() => {
        return cx('tab-shark', { 'active-shark': tabOverviewTransaction === 'newShark' });
    }, [tabOverviewTransaction]);
    return (
        <div className={cx('shark-container')}>
            <div className={cx('shark-overview')}>
                <div className={cx('shark-search')}>
                    <div className="d-flex justify-content-between">
                        <div onClick={() => setTabOverviewTransaction('oldShark')} className={allSharkClassName}>
                            All{' '}
                        </div>
                        <div onClick={() => setTabOverviewTransaction('newShark')} className={newSharkClassName}>
                            New shark {newSharkQuantity > 0 && <span className={cx('badge')}>{newSharkQuantity}</span>}
                        </div>
                    </div>
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
                        {viewListSharkCoinPagination.slice().sort((prev, next) => next.isFollowed - prev.isFollowed).map((sharkCoin) => (
                            <SharkWalletsOverviewItem data={sharkCoin} key={sharkCoin.sharkId} userInfo={userInfo} />
                        ))}
                    </tbody>
                </table>

                {status !== 'loading' && viewListSharkCoinPagination.length === 0 && <NoData />}
                {/* {status !== 'loading' && sharksCoin.length === 0 && <NoData />} */}
            </div>
            <div id={cx('market-table__pagination')}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={cx('break-me')}
                    pageCount={Math.ceil(
                        tabOverviewTransaction === 'oldShark'
                            ? sharksCoin.length / NUMBER_ITEM_DISPLAY
                            : newSharkList.length / NUMBER_ITEM_DISPLAY,
                    )}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
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
