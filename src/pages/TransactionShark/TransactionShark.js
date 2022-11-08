import React, {useCallback, useEffect} from 'react';
import classNames from 'classnames/bind';
import styles from './TransactionShark.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionShark } from '~/modules/TransactionShark/transactionSharkSlice';
import { transactionSharkSelector } from '~/modules/TransactionShark/selector';
import Button from '~/components/Button';
import TransactionSharkItem from './components/TransactionSharkItem.js/TransactionSharkItem';

const cx = classNames.bind(styles);
function TransactionShark() {
    const dispatch = useDispatch();
    const transactionShark = useSelector(transactionSharkSelector);
    useEffect(() => {
        dispatch(fetchTransactionShark());
    }, [dispatch]);

    console.log(transactionShark)
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
                    {TransactionSharkItem.length === 0 && <div className="text-center">No data</div>}
                    {TransactionSharkItem.map((trans, index) => {
                        if (Object.keys(trans).length !== 0) {
                            return <TransactionSharkItem data={trans} index={index} key={index} />;
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionShark;
