import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';
import Image from '~/components/Image/Image';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import images from '~/assets/images';
import { useState } from 'react';
import { authService } from '~/services';
import Modal from '~/components/Modal';
import ModalNotify from '~/components/ModalNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Portfolio({ data }) {
    const navigate = useNavigate();
    const userInfo = useSelector(userInfoSelector);
    const [openModalSucceed, setOpenModalSucceed] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleLogOut = () => {
        const fetchApi = async () => {
            const response = await authService.signOut();
            if (response.message === 'successfully') {
                setOpenModalSucceed(true)
                localStorage.removeItem('userInfo');
                // navigate('/sign-in ');
            }
        };
        fetchApi();
    };

    return (
        <section className={cx('portfolio-container')}>
            <div className={cx('profile')}>
                <Image
                    width="150"
                    className={cx('profile-image')}
                    src={userInfo.avatar || images.userAvatar}
                    alt="logo"
                />
                <h5>{data.fullName || data.username}</h5>
            </div>
            <ul className={cx('account')}>
                <li>Upgrade Premium</li>
                <li onClick={() => navigate('/profile')}>Your profile</li>
                <li onClick={openModal}>Sign out</li>
            </ul>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className={cx('logout-modal')}>
                    <span className={cx('logout-modal__title')}>Sign out from Status?</span>
                    <div className={cx('logout-modal__options')}>
                        <button className={cx('logout-modal__options__degree')} onClick={handleLogOut}>
                            Yes, sign out
                        </button>
                        <button className={cx('logout-modal__options__cancel')} onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            {openModalSucceed && (
                <ModalNotify
                    typeSuccess={true}
                    icon={<FontAwesomeIcon icon={faCheck} />}
                    isOpen={openModalSucceed}
                    title={'Success'}
                    description={'Sign out successfully'}
                    onRequestClose={() => setOpenModalSucceed(false)}
                />
            )}
        </section>
    );
}

export default Portfolio;
