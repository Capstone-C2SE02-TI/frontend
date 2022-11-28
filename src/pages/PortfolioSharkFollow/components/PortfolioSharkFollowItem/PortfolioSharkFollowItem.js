import React from 'react';
import classNames from 'classnames/bind';
import styles from './PortfolioSharkFollowItem.module.scss';
import millify from 'millify';
const cx = classNames.bind(styles);


function PortfolioSharkFollowItem({ index, key, dataSharkFollowed }) {
    return (
        <tr className={cx('portfolio-shark-follow__tr')}>
            <td>Shark {dataSharkFollowed.id}</td>
            <td></td>
            <td>${millify(dataSharkFollowed.totalAssets, {
                precision: 3,
                decimalSeparator: ',',
            })}</td>
            <td></td>
            <td>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default PortfolioSharkFollowItem;
