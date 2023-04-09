import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './TransactionShark.module.scss';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { transactionSharkService } from '~/services';
import TransactionSharkItem from './components/TransactionSharkItem/TransactionSharkItem';

const cx = classNames.bind(styles);

function TransactionShark() {
    const [transactionShark, setTransactionShark] = useState([])
    const [transactionSharkLength, setTransactionSharkLength] = useState('')
    const [valueFilter, setValueFilter] = useState('');
    const [currentPage, setCurrentPage] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSharkWallet());
        getLength()
        handleSubmit()
    }, [currentPage, dispatch]);

    const handlePageClick = (pageNum) => {
        let currenPage = pageNum.selected + 1;
        setCurrentPage(currenPage);
    };

    const handleChange = (e) => {
        const value = (e.target.validity.valid) ? e.target.value : '';
        setValueFilter(value)
    };
    const getLength = () => {
        const fetchApi = async () => {
            const data = await transactionSharkService.getTransactionSharkLength(
                {
                    valueFilter: valueFilter ? valueFilter : 0,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setTransactionSharkLength(data.data[0].transactionsLength)
        };
        fetchApi();
    }
    const handleSubmit = () => {
        const fetchApi = async () => {
            const data = await transactionSharkService.getTransactionShark(
                {
                    page: currentPage ? currentPage : 1,
                    valueFilter: valueFilter ? valueFilter : 0,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setTransactionShark(data.datas)
        };
        fetchApi();
    }
    return (
        <div className={cx('transaction-container__fluid')}>
            <div className={cx('transaction-container')}>
                <div className={cx('transaction-search')}>
                    <h1>Search shark transactions</h1>
                    <input
                        defaultValue={0}
                        type="number"
                        name="valueFilter"
                        onChange={handleChange}
                    />
                    <Button primary onClick={handleSubmit}>
                        Search
                    </Button>

                </div>
                <table className={cx('transaction-shark-tab')}>
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
                        {/* {transactionShark.length === 0 && <div className="text-center">No data</div>} */}
                        {transactionShark.map((trans, index) => {
                            return <TransactionSharkItem key={index} data={trans} index={index} sharkAddress={trans.walletAddress} />
                        }
                        )}
                    </tbody>
                </table>
            </div>
            <div id={cx('transaction-table__pagination')}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={cx('break-me')}
                    pageCount={transactionSharkLength / 20}
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
