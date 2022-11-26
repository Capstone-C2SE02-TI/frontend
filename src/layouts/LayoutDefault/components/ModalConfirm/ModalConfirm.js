import classNames from "classnames/bind";
import styles from './ModalConfirm.module.scss'
import  Modal  from '~/components/Modal';
const cx = classNames.bind(styles);


function ModalConfirm({ modalIsOpen, closeModal, onHandleAction, title, description }) {

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <div className={cx('logout-modal')}>
                <div className={cx('logout-modal__content')}>
                    <span className={cx('logout-modal__title')}>{title}</span>
                    <span className={cx('logout-modal__desc')}>{description}</span>
                </div>
                <div className={cx('logout-modal__options')}>
                    <button className={cx('logout-modal__options__degree')} onClick={() => {
                        onHandleAction()
                        closeModal()
                    }}>
                        Yes
                    </button>
                    <button className={cx('logout-modal__options__cancel')} onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalConfirm;