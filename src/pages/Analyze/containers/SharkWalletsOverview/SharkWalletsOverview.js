import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './SharkWalletsOverview.module.scss';
import SharkWalletsOverviewItem from '../../components/SharkWalletsOverviewItem/';
import { useSelector, useDispatch } from 'react-redux';
import { sharkListSelector } from '~/modules/SharkWallet/selector';
import sharkWalletSlice, { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function SharkWalletsOverview() {

   const dispatch = useDispatch();

   useEffect(() => {
       dispatch(fetchSharkWallet());
   }, [dispatch]);
    
   const sharksCoin = useSelector(sharkListSelector);

    useEffect(() => {
        if (sharksCoin.length > 0) {
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(sharksCoin[0].id));
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletAddress(sharksCoin[0].walletAddress));
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletTotalAssets(sharksCoin[0].totalAsset));
            dispatch(sharkWalletSlice.actions.actionSharkInfo(sharksCoin[0]));
        }
    }, [sharksCoin]);
    return (
        <div className={cx('shark-overview')}>
            <div className={cx('shark-search')}>
                <input placeholder="Search..."></input>
                <div className={cx('shark-category')}>
                    <p>All categories</p>
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
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
                    {sharksCoin.map((sharkCoin) => (
                        <SharkWalletsOverviewItem data={sharkCoin} key={sharkCoin.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SharkWalletsOverview;
