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

const cx = classNames.bind(styles);

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
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(sharksCoin[0].id));
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

    return (
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
                    {sharksCoin
                        .filter((shark) => shark.totalAssets)
                        .map((sharkCoin) => (
                            <SharkWalletsOverviewItem data={sharkCoin} key={sharkCoin.id} userInfo={userInfo} />
                        ))}
                </tbody>
            </table>
            {status !== 'loading' && sharksCoin.length === 0 && <NoData />}
        </div>
    );
}

export default SharkWalletsOverview;
