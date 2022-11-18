import React from 'react';
import classNames from 'classnames/bind';
import styles from './GainLossCryptoItem.module.scss';

const cx = classNames.bind(styles);

function GainLossCryoptoItem({ gainLossCryptoData, index, status }) {
    return (
        <tr className={cx('shark-gain-item__tr')}>
            <td className={cx('shark-gain-item__td')}>{index + 1}</td>
            <td className={cx('shark-gain-item__td')}>{gainLossCryptoData.symbol}</td>
            <td className={cx('shark-gain-item__td')}>${gainLossCryptoData.usd.price.toFixed(3)}</td>
            {status === false ? <td style={{ color: "#8aff56" }} className={cx('shark-gain-item__td')}>{gainLossCryptoData.usd.percentChange24h.toFixed(3)}%</td> : <td style={{ color: "red" }} className={cx('shark-gain-item__td')}>{gainLossCryptoData.usd.percentChange24h.toFixed(3)}%</td>}
        </tr>
    );
}

export default GainLossCryoptoItem;
