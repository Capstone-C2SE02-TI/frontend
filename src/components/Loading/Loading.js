import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function Loading({ className, children }) {
    return (
        <div className={cx('wrapper')}>
            
            <div className={cx('container')}><Spin></Spin></div>
        </div>
    );
}

export default Loading;
