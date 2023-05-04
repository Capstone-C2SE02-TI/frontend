import React from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './CopyTradingListShark.module.scss';

const cx = classNames.bind(styles);

const CopyTradingListShark = ({ key, dataSharkFollowed }) => {
    return (
        <tr className={cx('copy-trading--line')}>
            <td>Shark #{dataSharkFollowed.sharkId}</td>
            {/* <td >{dataSharkFollowed.walletAddress}</td> */}
            <td>
                $
                {millify(dataSharkFollowed.totalAssets, {
                    precision: 3,
                    decimalSeparator: ',',
                })}
            </td>
            {
                dataSharkFollowed.percent24h.toFixed(3) > 0 ?
                    <td className={cx("increase")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td> :
                    <td className={cx("decrease")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
            }
            <td className={cx('copy-trading--add')}>
                <button>Add to trade</button>
            </td>
            <td className={cx('copy-trading--pair')}>
                <select className={cx('select-copy')}>
                    <option value="USDT" >ETH/USDT</option>
                    <option value="BUSD">ETH/BUSD</option>
                    <option value="WETH">ETH/WETH</option>
                </select>
            </td>
        </tr>
    );
}

export default CopyTradingListShark;
