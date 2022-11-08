import React from 'react';
import classNames from 'classnames/bind';
import styles from './TransactionShark.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function TransactionShark() {
    return (
        <div className={cx('transaction-container')}>
            <div className={cx('transaction-search')}>
                <h1>Search all transactions</h1>
                <input placeholder='Enter price $' />
                <Button primary>Search</Button>
            </div>
            <table className={cx('transaction-shark__table')}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Shark</th>
                        <th>Transaction</th>
                        <th>Past value</th>
                        <th>Present value</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
}

export default TransactionShark;
