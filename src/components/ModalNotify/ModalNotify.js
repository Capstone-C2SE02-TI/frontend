import classNames from 'classnames/bind';
import LoadingCustomize from '../LoadingCustomize';
import styles from './ModalNotify.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import images  from '~/assets/images';
import Modal from '../Modal/Modal';
const cx = classNames.bind(styles);

function ModalNotify({ title, description, onRequestClose, isOpen, icon }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className={cx('content')}>
                <div className={cx('icon')}>
                    {icon}
                    {/* <img src={icon} alt="" /> */}
                </div>
                <h4 className={cx('title')}>{title}</h4>
                <p className={cx('desc')}>{description}</p>
                <div>
                    <Button success onClick={onRequestClose}>
                        OK
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalNotify;
