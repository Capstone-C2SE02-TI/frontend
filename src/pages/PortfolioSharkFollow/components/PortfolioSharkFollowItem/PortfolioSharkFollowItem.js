import React, { useState } from 'react';
import { StarYellowIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PortfolioSharkFollowItem.module.scss';
import { fetchUnFollowSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import ModalConfirm from '~/layouts/LayoutDefault/components/ModalConfirm';
import millify from 'millify';
import { saveSharkFollowedSelected } from '~/modules/Portfolio/portfolioSlice';
import { sharkFollowedSelectedSelector } from '~/modules/Portfolio/selector';
const cx = classNames.bind(styles);


function PortfolioSharkFollowItem({ userId, dataSharkFollowed, onChangeSharkSelelected }) {

    const [sharkACtive, setSharkActive] = useState()

    const [openModal, setOpenModal] = useState(false)
    const [confirmContent, setConfirmContent] = useState({});

    const dispatch = useDispatch();

    // console.log(dataSharkFollowed)

    const openModalConfirm = (title, description, type) => {
        setOpenModal(true)
        setConfirmContent({ title, description, type });
    }

    const closeModalConfirm = () => {
        setOpenModal(false)
        setConfirmContent({})
    }

    const handleUnFollow = () => {
        if (confirmContent.type === 'unfollow') {
            dispatch(fetchUnFollowSharkWallet({ userId: userId, sharkId: dataSharkFollowed.sharkId }));

            onChangeSharkSelelected(dataSharkFollowed.sharkId)
        }
    }

    return (
        <>
            <tr
                className={cx('portfolio-shark-follow__tr')}
                onClick={() => {
                    dispatch(saveSharkFollowedSelected(dataSharkFollowed));
                }}
            >
                <td>Shark #{dataSharkFollowed.sharkId}</td>
                <td >{dataSharkFollowed.walletAddress}</td>
                <td>
                    $
                    {millify(dataSharkFollowed.totalAssets, {
                        precision: 3,
                        decimalSeparator: ',',
                    })}
                </td>
                {/* <td>{dataSharkFollowed.transactionsHistory.length}</td> */}
                <td>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
                {/* <td></td> */}
                <td
                    onClick={() => {
                        openModalConfirm('Follow shark', 'Are you sure unfollow this shark?', 'unfollow');
                    }}
                >
                    <StarYellowIcon />
                </td>
            </tr>
            {
                openModal && (
                    <ModalConfirm
                        title={confirmContent.title}
                        description={confirmContent.description}
                        modalIsOpen={openModal}
                        closeModal={closeModalConfirm}
                        onHandleAction={handleUnFollow}
                    />
                )
            }
        </>
    );
}

export default PortfolioSharkFollowItem;
