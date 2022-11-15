import { StarIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SharkWalletOverviewItem.module.scss';
import sharkWalletSlice from '~/modules/SharkWallet/sharkWalletSlice';
import numberWithCommas from '~/helpers/numberWithCommas';
import { useRef } from 'react';
import { sharkInfoSelector } from '~/modules/SharkWallet/selector';

const cx = classNames.bind(styles);

function SharkWalletsOverviewItem({ data }) {
    const dispatch = useDispatch();

    const handleSelectSharkAndSharkAddress = (sharkId, address, totalAsset) => {
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(sharkId));
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletAddress(address));
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletTotalAssets(totalAsset));
        dispatch(sharkWalletSlice.actions.actionSharkInfo(data));
    };

    const sharkInfoCurrent = useSelector(sharkInfoSelector);
    const parentRef = useRef();
    const childrenRef = useRef();

    return (
        <tr
            className={cx({ 'shark-active': data.id === sharkInfoCurrent.id })}
            onClick={() => {
                handleSelectSharkAndSharkAddress(data.id, data.walletAddress, data.totalAsset);
            }}
            ref={parentRef}
        >
            <td ref={childrenRef}>#Shark {data.id}</td>
            <td>${numberWithCommas(data.totalAssets)}</td>
            <td>{data.percent24h.toFixed(3) + '%' || '0%'}</td>
            <td>
                <StarIcon />
            </td>
        </tr>
    );
}

export default SharkWalletsOverviewItem;
