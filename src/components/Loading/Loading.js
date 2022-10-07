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
        <tr className={cx('wrapper')}>
            {/* <div className={cx('overlay')}></div> */}
            <td className={classNames}>
                <Spin> </Spin>
            </td>
        </tr>
    );
};

export default Loading;
