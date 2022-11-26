import { StarIcon, StarYellowIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SharkWalletOverviewItem.module.scss';
import sharkWalletSlice, {
    fetchFollowSharkWallet,
    fetchUnFollowSharkWallet,
} from '~/modules/SharkWallet/sharkWalletSlice';
import { useRef, useState} from 'react';
import { sharkInfoSelector } from '~/modules/SharkWallet/selector';
import millify from 'millify';
import ModalConfirm from '~/layouts/LayoutDefault/components/ModalConfirm';

const cx = classNames.bind(styles);

function SharkWalletsOverviewItem({ data, userInfo }) {
    const [openModal, setOpenModal] = useState(false)
    const [confirmContent, setConfirmContent] = useState({});
   
   
    const dispatch = useDispatch();


    const handleSelectSharkAndSharkAddress = () => {
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(data.id));
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletAddress(data.walletAddress));
        dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletTotalAssets(data.totalAsset));
        dispatch(sharkWalletSlice.actions.actionSharkInfo(data));
    };

    const sharkInfoCurrent = useSelector(sharkInfoSelector);
    const parentRef = useRef();
    const childrenRef = useRef();

    const handleFollowAndUnFollow = () => {
        if (confirmContent.type === 'follow') {
             dispatch(fetchFollowSharkWallet({ userId: userInfo.userId, sharkId: data.id }));
        }
        else {
             dispatch(fetchUnFollowSharkWallet({ userId: userInfo.userId, sharkId: data.id }));
        }
    }

    const openModalConfirm = (title ,description, type) => {
        setOpenModal(true)
        setConfirmContent({ title, description, type });
    }
    
    const closeModalConfirm = () => {
        setOpenModal(false)
        setConfirmContent({})
    }

    return (
        <tr className={cx({ 'shark-active': data.id === sharkInfoCurrent.id })} ref={parentRef}>
            <td ref={childrenRef} onClick={handleSelectSharkAndSharkAddress}>
                #Shark {data.id}
            </td>
            <td onClick={handleSelectSharkAndSharkAddress}>
                $
                {millify(data.totalAssets, {
                    precision: 3,
                    decimalSeparator: ',',
                })}
            </td>
            <td onClick={handleSelectSharkAndSharkAddress}>{data.percent24h.toFixed(3) + '%' || '0%'}</td>
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
