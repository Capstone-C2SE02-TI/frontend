import React from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './profileItem.module.scss'

const cx = classNames.bind(styles);

const ProfileItem = ({ key, dataSharkFollowed }) => {
    return (
        <tr className={cx('copy-trading--line')}>
            <td>Shark #{dataSharkFollowed.sharkId}</td>
            <td>{dataSharkFollowed.walletAddress}</td>
            {/* <td >{dataSharkFollowed.walletAddress}</td> */}
            <td>
                $
                {millify(dataSharkFollowed.totalAssets, {
                    precision: 3,
                    decimalSeparator: ',',
                })}
            </td>
            {/* {
                dataSharkFollowed.percent24h.toFixed(3) > 0 ?
                    <td className={cx("increase")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td> :
                    <td className={cx("decrease")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
            } */}
            <td>
                {dataSharkFollowed.totalTransactions}
            </td>
            {dataSharkFollowed.actualGrowth > 0 ? <td className={cx("increase")}>${millify(dataSharkFollowed.actualGrowth, {
                precision: 3,
                decimalSeparator: ',',
            })}</td> :
                <td className={cx("decrease")}>${millify(dataSharkFollowed.actualGrowth, {
                    precision: 3,
                    decimalSeparator: ',',
                })}</td>
            }

        </tr>
    );
}

export default ProfileItem;
