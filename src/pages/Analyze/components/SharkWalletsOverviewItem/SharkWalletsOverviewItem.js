import { StarIcon } from '~/components/Icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SharkWalletOverviewItem.module.scss';
import sharkWalletSlide from '~/modules/SharkWallet/sharkWalletSlice';
import numberWithCommas from '~/helpers/numberWithCommas';
import { useOnClickOutside } from '~/hooks/useOnclickOutSide';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function SharkWalletsOverviewItem({ data }) {
    const dispatch = useDispatch();

    const handleSelectSharkAndSharkAddress = (sharkId, address) => {
        dispatch(sharkWalletSlide.actions.actionSelectedSharkWalletId(sharkId));
        dispatch(sharkWalletSlide.actions.actionSelectedSharkWalletAddress(address));
    };

    const [isActiveShark, setIsActiveShark] = useState(data.id ===1 ? true: false);

    const parentRef = useRef();
    const childrenRef = useRef();

    useOnClickOutside(childrenRef, (e) => {
        if (!parentRef.current.contains(e.target)) {
            setIsActiveShark(false);
        }
    });
// isActiveShark ? 'shark-active' : '';
    return (
        <tr
            className={cx({ 'shark-active': isActiveShark })}
            onClick={() => {
                handleSelectSharkAndSharkAddress(data.id, data.walletAddress);
                setIsActiveShark(!isActiveShark);
            }}
            ref={parentRef}
        >
            <td ref={childrenRef}>#Shark {data.id}</td>
            <td>${numberWithCommas(data.totalAsset)}</td>
            <td>{data.percent24h.toFixed(3)+'%' || '0%'}</td>
            <td>
                <StarIcon />
            </td>
        </tr>
    );
}

export default SharkWalletsOverviewItem;
