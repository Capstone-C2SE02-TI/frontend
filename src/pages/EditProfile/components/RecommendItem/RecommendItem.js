import classNames from 'classnames/bind';
import styles from './RecommendItem.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import ModalConfirm from '~/layouts/LayoutDefault/components/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import millify from 'millify';
import { fetchFollowSharkWallet, fetchUnFollowSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { loadingSelector, sharkDetailSelector } from '~/modules/SharkWallet/selector';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function RecommendItem({ key, data, userInfo }) {
    const [openModal, setOpenModal] = useState(false);
    const [confirmContent, setConfirmContent] = useState({});
    const openModalConfirm = (title, description, type) => {
        setOpenModal(true);
        setConfirmContent({ title, description, type });
    };
    const dispatch = useDispatch();

    const loading = useSelector(loadingSelector);

    const handleFollowAndUnFollow = () => {
        if (confirmContent.type === 'follow') {
            dispatch(fetchFollowSharkWallet({ userId: userInfo.userId, sharkId: data.sharkId }));
        } else {
            dispatch(fetchUnFollowSharkWallet({ userId: userInfo.userId, sharkId: data.sharkId }));
        }
    };

    const closeModalConfirm = () => {
        setOpenModal(false);
        setConfirmContent({});
    };
    return (
        <div key={key} className={cx('recommend-item')}>
            <div className={cx('recommend-item-info')}>
                <div className={cx('recommend-item-name')}>
                    <span>
                        Shark {data.sharkId}
                        <img
                            src="https://s2.coinmarketcap.com/static/cloud/img/icon/certified.svg?_=b8777e5"
                            alt="certified"
                        />
                    </span>
                    <p>
                        {millify(data.totalAssets, {
                            precision: 3,
                        })}
                    </p>
                </div>
            </div>
            <div className={cx('recommend-item-follow')}>
                {data.isFollowed ? (
                    <Button
                        primary
                        onClick={() => {
                            openModalConfirm('UnFollow shark', 'Are you sure unfollow this shark?', 'unfollow');
                        }}
                    >
                        Following
                    </Button>
                ) : (
                    <Button
                        dark
                        onClick={() => {
                            openModalConfirm('Follow shark', 'Are you sure follow this shark?', 'follow');
                        }}
                    >
                        {' '}
                        + Follow
                    </Button>
                )}
            </div>
            {openModal && (
                <ModalConfirm
                    title={confirmContent.title}
                    description={confirmContent.description}
                    modalIsOpen={openModal}
                    closeModal={closeModalConfirm}
                    onHandleAction={handleFollowAndUnFollow}
                />
            )}

            <Loading loading={loading === 'loading' ? true : false} />
        </div>
    );
}

export default RecommendItem;
