import React, { useState } from 'react';
import { StarYellowIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import styles from './PortfolioSharkFollowItem.module.scss';
import { fetchUnFollowSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import ModalConfirm from '~/layouts/LayoutDefault/components/ModalConfirm';
import millify from 'millify';
const cx = classNames.bind(styles);


function PortfolioSharkFollowItem({ key, userId, dataSharkFollowed }) {
    const [openModal, setOpenModal] = useState(false)
    const [confirmContent, setConfirmContent] = useState({});

    const dispatch = useDispatch();

    const openModalConfirm = (title, description, type) => {
        setOpenModal(true)
        setConfirmContent({ title, description, type });
    }

    const closeModalConfirm = () => {
        setOpenModal(false)
        setConfirmContent({})
    }

    const handleUnFollow = () => {
        if (confirmContent.type === 'follow') {
            dispatch(fetchUnFollowSharkWallet({ userId: userId, sharkId: dataSharkFollowed.id }));
        }
    }

    return (
        <tr className={cx('portfolio-shark-follow__tr')}>
            <td>Shark #{dataSharkFollowed.id}</td>
            <td></td>
            <td>${millify(dataSharkFollowed.totalAssets, {
                precision: 3,
                decimalSeparator: ',',
            })}</td>
            <td>{dataSharkFollowed.transactionsHistory.length}</td>
            <td>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
            <td></td>
            <td onClick={() => {
                openModalConfirm('Follow shark', 'Are you sure unfollow this shark?', 'follow');
            }}
            >
                <StarYellowIcon />
            </td>
            {openModal && (
                <ModalConfirm
                    title={confirmContent.title}
                    description={confirmContent.description}
                    modalIsOpen={openModal}
                    closeModal={closeModalConfirm}
                    onHandleAction={handleUnFollow}
                />
            )}
        </tr>

    );
}

export default PortfolioSharkFollowItem;
