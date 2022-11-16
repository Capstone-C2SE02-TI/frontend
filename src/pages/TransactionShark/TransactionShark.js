import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './TransactionShark.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionShark } from '~/modules/TransactionShark/transactionSharkSlice';
import { transactionSharkSelector } from '~/modules/TransactionShark/selector';
import Button from '~/components/Button';
import TransactionSharkItem from './components/TransactionSharkItem/TransactionSharkItem';
import { sharkWalletAddressSelector } from '~/modules/SharkWallet/selector';

const cx = classNames.bind(styles);

function TransactionShark() {
    const dispatch = useDispatch();
    const transactionShark = useSelector(transactionSharkSelector);
    const sharkAddress = useSelector(sharkWalletAddressSelector);

    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        dispatch(fetchTransactionShark(currentPage ? currentPage : 1));
    }, [currentPage, dispatch]);

    const handlePageClick = (pageNum) => {
        let currenPage = pageNum.selected + 1;
        setCurrentPage(currenPage);
    };
    return (
        <div className={cx('transaction-container__fluid')}>
            <div className={cx('transaction-container')}>
                <div className={cx('transaction-search')}>
                    <h1>Search all transactions</h1>
                    <input placeholder="Enter price $" />
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
                        {transactionShark.length === 0 && <div className="text-center">No data</div>}
                        {transactionShark
                            .filter((tran) => tran.sharkId)
                            .map((trans, index) => {
                                console.log({ trans });
                                return <TransactionSharkItem data={trans} index={index} sharkAddress={sharkAddress} />;
                            })}
                    </tbody>
                </table>
            </div>
            <div id={cx('transaction-table__pagination')}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={cx('break-me')}
                    pageCount={112 / 20}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    // forcePage={searchText ? 0 : paginationState - 1}
                    containerClassName={cx('pagination')}
                    activeClassName={cx('active')}
                />
            </div>
        </div>
    );
}

export default TransactionShark;
