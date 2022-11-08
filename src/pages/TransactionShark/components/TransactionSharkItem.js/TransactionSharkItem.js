import React from 'react';
import classNames from 'classnames/bind';
import styles from './TransactionSharkItem.module.scss'
import Button from '~/components/Button';
import { convertUnixtimeToTimeCurrent,numberWithCommas}  from '~/helpers';

const cx = classNames.bind(styles);

function TransactionSharkItem({ data, index }) {
    return (
        <tr className={cx('transaction-shark__tr')}>
            <td>17/10/2022 05:32: 23 AM</td>
            <td>shark #1</td>
            <td>0x1ec8568a537fd469b4a8f765c817e992253d471b → Wallet</td>
            <td>
                -700,000.00 USDC
                @1.00 $699,885.90
            </td>
            <td>
                -700,000.00 USDC
                @1.00 $699,885.90
            </td>
        </tr>
    )
}
export default TransactionSharkItem;