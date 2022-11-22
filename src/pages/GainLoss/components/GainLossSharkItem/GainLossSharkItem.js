import React from 'react';
import classNames from 'classnames/bind';
import styles from './GainLossSharkItem.module.scss';
import { numberWithCommas } from '~/helpers';


const cx = classNames.bind(styles);

function GainLossSharkItem({ gainLossSharkData, index, status }) {
    return (
        <tr className={cx('shark-gain-item__tr')}>
            <td className={cx('shark-gain-item__td')}>{index + 1}</td>
            <td className={cx('shark-gain-item__td')}>Shark #{gainLossSharkData.id}</td>
            <td className={cx('shark-gain-item__td')}>${numberWithCommas(gainLossSharkData.totalAssets)}</td>
            {status === false ? <td style={{ color: "#8aff56" }} className={cx('shark-gain-item__td')}>{gainLossSharkData.percent24h.toFixed(2)}%</td> : <td style={{ color: "red" }} className={cx('shark-gain-item__td')}>{gainLossSharkData.percent24h.toFixed(2)}%</td>}
        </tr>
    );
}

export default GainLossSharkItem;
