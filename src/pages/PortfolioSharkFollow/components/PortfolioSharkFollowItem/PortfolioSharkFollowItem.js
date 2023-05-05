import React, { useRef, useState } from 'react';
import { StarYellowIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PortfolioSharkFollowItem.module.scss';
import { fetchUnFollowSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import ModalConfirm from '~/layouts/LayoutDefault/components/ModalConfirm';
import millify from 'millify';
import { saveSharkFollowedSelected } from '~/modules/Portfolio/portfolioSlice';
import { sharkFollowedSelectedSelector } from '~/modules/Portfolio/selector';
import { useOnclickOutSide } from '~/hooks';
import { sharkFollowedSelector } from '~/modules/SharkFollowed/selector';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
const cx = classNames.bind(styles);


function PortfolioSharkFollowItem({ dataSharkFollowed, onChangeSharkSelelected, isActiveDefault }) {

    const [sharkACtive, setSharkActive] = useState()

    const [openModal, setOpenModal] = useState(false)
    const [confirmContent, setConfirmContent] = useState({});
    const [isActiveShark, setIsActiveShark] = useState(isActiveDefault);
    const walletAddress = useSelector(getAddressMetaMask);

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
        if (confirmContent.type === 'unfollow') {
            dispatch(fetchUnFollowSharkWallet({ walletAddress: walletAddress, sharkId: dataSharkFollowed.sharkId }));
            onChangeSharkSelelected(dataSharkFollowed.sharkId)
        }
    }
    const refParentPortfolio = useRef()
    const refChildrenPortfolio = useRef()
    useOnclickOutSide(refChildrenPortfolio, (e) => {
        if (!refParentPortfolio.current.contains(e.target)) {
            setIsActiveShark(false);
        }
    });
    const portfolioItem__tr = cx('portfolio-shark-follow__tr', { active: isActiveShark })
    return (
        <>
            <tr
                ref={refParentPortfolio}
                className={portfolioItem__tr}
                onClick={() => {
                    dispatch(saveSharkFollowedSelected(dataSharkFollowed));
                    setIsActiveShark(true)
                }}
            >
                <td ref={refChildrenPortfolio}>Shark #{dataSharkFollowed.sharkId}</td>
                <td>{dataSharkFollowed.walletAddress}</td>
                {/* <td >{dataSharkFollowed.walletAddress}</td> */}
                <td>
                    $
                    {millify(dataSharkFollowed.totalAssets, {
                        precision: 3,
                        decimalSeparator: ',',
                    })}
                </td>
                {
                    dataSharkFollowed.percent24h.toFixed(3) > 0 ?
                        <td className={cx("increase")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td> :
                        <td className={cx("decrease")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
                }

                <td
                    onClick={() => {
                        openModalConfirm('Follow shark', 'Are you sure unfollow this shark?', 'unfollow');
                    }}
                >
                    <StarYellowIcon />
                </td>
            </tr>
            {openModal && (
                <ModalConfirm
                    title={confirmContent.title}
                    description={confirmContent.description}
                    modalIsOpen={openModal}
                    closeModal={closeModalConfirm}
                    onHandleAction={handleUnFollow}
                />
            )}
        </>
    );
}

export default PortfolioSharkFollowItem;
