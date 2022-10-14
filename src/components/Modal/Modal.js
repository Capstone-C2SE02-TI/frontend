import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import Portal from '~/components/Portal';
import { TimesIcon } from '../Icons';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';

const cx = classNames.bind(styles);

const defaultFunction = () => {};

function Modal({ children, isOpen = false, shouldCloseOverlayClick = true, onRequestClose = defaultFunction }) {
    const [closing, setClosing] = useState(false);
    const containerRef = useRef();

    const handleRequestClose = useCallback(() => {
        setClosing(true);

        containerRef.current.addEventListener(
            'animationend',
            () => {
                setClosing(false);
                onRequestClose();
            },
            { once: true },
        );
    }, [onRequestClose]);

    useEffect(() => {
        const handle = (e) => {
            if (isOpen && e.code === 'Escape') {
                handleRequestClose();
            }
        };
        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [handleRequestClose, isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <Portal containerId="modal">
            <div className={cx('wrapper', { closing })}>
                <div
                    className={cx('overlay')}
                    onClick={shouldCloseOverlayClick ? handleRequestClose : defaultFunction}
                ></div>
                <div className={cx('container')} ref={containerRef}>
                    <div>{children}</div>
                </div>
            </div>
        </Portal>
    );
}

export default Modal;
