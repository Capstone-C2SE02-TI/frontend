import styles from './SharkTransactionHistory.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {  fetchTransactionHistorySharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import {
    sharkCryptoStatusSelector,
    sharkTransactionHistorySelector,
    sharkWalletAddressSelector,
    sharkWalletIdSelector,
} from '~/modules/SharkWallet/selector';
import { Spin } from 'antd';
import SharkWalletTransactionItem from './../../components/SharkWalletTransactionItem/SharkWalletTransactionItem';
const cx = classNames.bind(styles);

function SharkTransactionHistory({ currentTabSharkWallet }) {
    const dispatch = useDispatch();

    const sharkCryptoStatus = useSelector(sharkCryptoStatusSelector);
    const sharkIdSelected = useSelector(sharkWalletIdSelector);
    const sharkAddressSelected = useSelector(sharkWalletAddressSelector);
    const sharkTransactionHistory = useSelector(sharkTransactionHistorySelector);

    useEffect(() => {
        dispatch(fetchTransactionHistorySharkWallet(sharkIdSelected));
    }, [dispatch, sharkIdSelected]);

    return (
        currentTabSharkWallet === 'transaction-history' &&
        (sharkCryptoStatus === 'loading' ? (
            <Spin>
                <table className={cx('table-shark__crypto')}>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Transaction</th>
                            <th>Past Value</th>
                            <th>Past Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sharkTransactionHistory.map((transaction, index) => {
                            if (Object.keys(transaction).length !== 0) {
                                return (
                                    <SharkWalletTransactionItem
                                        data={transaction}
                                        index={index}
                                        key={index}
                                        sharkAddress={sharkAddressSelected}
                                    />
                                );
                            }
                        })}
                    </tbody>
                </table>
            </Spin>
        ) : (
            <table className={cx('table-shark__crypto')}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Logo</th>
                        <th>Quantity</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {sharkTransactionHistory.length === 0 && <div className="text-center">No data</div>}
                    {sharkTransactionHistory.map((transaction, index) => {
                        if (Object.keys(transaction).length !== 0) {
                            return (
                                <SharkWalletTransactionItem
                                    data={transaction}
                                    index={index}
                                    key={index}
                                    sharkAddress={sharkAddressSelected}
                                />
                            );
                        }
                    })}
                </tbody>
            </table>
        ))
    );
}

export default SharkTransactionHistory;
