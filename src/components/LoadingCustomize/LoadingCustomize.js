import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoadingCustomize.module.scss';

const cx = classNames.bind(styles);

function LoadingCustomize({ className, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default LoadingCustomize;
