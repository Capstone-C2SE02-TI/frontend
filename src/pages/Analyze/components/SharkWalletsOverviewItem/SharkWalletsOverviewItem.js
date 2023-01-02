import { StarIcon, StarYellowIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SharkWalletOverviewItem.module.scss';
import sharkWalletSlice, {
    fetchFollowSharkWallet,
    fetchUnFollowSharkWallet,
} from '~/modules/SharkWallet/sharkWalletSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { sharkInfoSelector } from '~/modules/SharkWallet/selector';
import millify from 'millify';
import ModalConfirm from '~/layouts/LayoutDefault/components/ModalConfirm';

const cx = classNames.bind(styles);

function SharkWalletsOverviewItem({ data, userInfo }) {
    const [openModal, setOpenModal] = useState(false);
    const [confirmContent, setConfirmContent] = useState({});

    const dispatch = useDispatch();

    const classNamesStatusCoin24h = cx(data.percent24h >= 0 ? 'increase' : 'reduce');

    const handleSelectSharkAndSharkAddress = () => {
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(data.sharkId));
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletAddress(data.walletAddress));
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletTotalAssets(data.totalAsset));
        dispatch(sharkWalletSlice.actions.actionSharkInfo(data));
    };

    const sharkInfoCurrent = useSelector(sharkInfoSelector);
    const parentRef = useRef();
    const childrenRef = useRef();

    const handleFollowAndUnFollow = () => {
        if (confirmContent.type === 'follow') {
            dispatch(fetchFollowSharkWallet({ userId: userInfo.userId, sharkId: data.sharkId }));
        } else {
            dispatch(fetchUnFollowSharkWallet({ userId: userInfo.userId, sharkId: data.sharkId }));
        }
    };

    const openModalConfirm = (title, description, type) => {
        setOpenModal(true);
        setConfirmContent({ title, description, type });
    };

    const closeModalConfirm = () => {
        setOpenModal(false);
        setConfirmContent({});
    };


    // The scroll listener
    const handleScroll = useCallback(() => {
        console.log('scrolling');
    }, []);

    // Attach the scroll listener to the div
    useEffect(() => {
        const div = parentRef.current;
        div.addEventListener('scroll', handleScroll);
    }, [handleScroll]);
    console.log(data)
    return (
        <tr
            className={cx('react-bootstrap-table', { 'shark-active': data.sharkId === sharkInfoCurrent.sharkId })}
            ref={parentRef}
        >
            <td className={cx('shark-default-td')} ref={childrenRef} onClick={handleSelectSharkAndSharkAddress}>
                <p className="d-flex justify-content-around">#Shark {data.sharkId}</p>
                {data.newShark === true ? <p className={cx('new-shark')}>NEW SHARK</p> : ''}
            </td>
            <td onClick={handleSelectSharkAndSharkAddress}>
                $
                {millify(data.totalAssets, {
                    precision: 3,
                    decimalSeparator: ',',
                })}
            </td>
            <td onClick={handleSelectSharkAndSharkAddress} className={cx(classNamesStatusCoin24h)}>
                {data.percent24h === 100 || data.percent24h === 0 ? '0%' : data.percent24h.toFixed(3) + '%'}
            </td>
            {data.isFollowed ? (
                <td
                    onClick={() => {
                        openModalConfirm('UnFollow shark', 'Are you sure unfollow this shark?', 'unfollow');
                    }}
                >
                    <StarYellowIcon />
                </td>
            ) : (
                <td
                    onClick={() => {
                        openModalConfirm('Follow shark', 'Are you sure follow this shark?', 'follow');
                    }}
                >
                    <StarIcon />
                </td>
            )}
            {openModal && (
                <ModalConfirm
                    title={confirmContent.title}
                    description={confirmContent.description}
                    modalIsOpen={openModal}
                    closeModal={closeModalConfirm}
                    onHandleAction={handleFollowAndUnFollow}
                />
            )}
        </tr>
    );
}

export default SharkWalletsOverviewItem;
