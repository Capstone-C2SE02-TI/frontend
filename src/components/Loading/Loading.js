import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss'

const cx = classNames.bind(styles);

function Loading({ className }) {

    const classNames = cx('container', {
        [className]: className,
    });

    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('overlay')}></div> */}
            <div className={classNames}>
                <Spin> </Spin>
            </div>
        </div>
    );
};

export default Loading;
