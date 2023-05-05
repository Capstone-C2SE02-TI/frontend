import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './SettingTrading.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import { sharkFollowedSelector } from '~/modules/SharkFollowed/selector';
import TransactionItem from './components/TransactionItem';
import { sliceArrayToPagination } from '~/helpers';
import { useMemo } from 'react';
const cx = classNames.bind(styles);
const NUMBER_ITEM_DISPLAY = 10;
function SettingTrading() {
  const ethAddress = localStorage.getItem('eth_address');
  const dispatch = useDispatch();
  const sharkFolloweds = useSelector(sharkFollowedSelector);
  const [transactionsShark, setTransactionsShark] = useState([]);
  const [transactionsSharkRemaining, setTransactionsSharkRemaining] = useState([]);
  const [paginationState, setPaginationState] = useState(1);

  useEffect(() => {
    dispatch(fetchSharkFollowed(ethAddress));
  }, [dispatch, ethAddress]);

  useEffect(() => {
    if (sharkFolloweds.length > 0) {
      async function fetchData() {
        const promises = [];

        for (let i = 0; i < sharkFolloweds.length; i++) {
          const response = await fetch(`/tx/latest/?address=${sharkFolloweds[i].walletAddress}&pages=1`);
          const result = await response.json();
          promises.push({sharkId: sharkFolloweds[i].sharkId, data: result.TXs});
        }

        const results = await Promise.all(promises);
        setTransactionsShark(results);
      }
      fetchData();
    }
  }, [sharkFolloweds]);

  const handlePageClick = (selectedItem) => {
    setPaginationState(selectedItem.selected + 1);
  };

  const viewTransactionsShark = useMemo(() => {
   
      const newTransactionsAddSharkId = transactionsShark.map(transaction => {
        return transaction.data.map(d => {
          return {
            ...d,
            sharkId: transaction.sharkId
          }
        })
      })
      let transactionSlice = [];
      newTransactionsAddSharkId.forEach(transaction => {
        const filterTransaction = transaction.filter(tr => +tr.transactionIndex > 0)
        transactionSlice.push(...filterTransaction)
      } )
      setTransactionsSharkRemaining(transactionSlice)
      return sliceArrayToPagination(transactionSlice, paginationState, NUMBER_ITEM_DISPLAY);
    
    
  }, [transactionsShark, paginationState]);

  return (
    <div>
      <table className={cx('setting-trading-shark-tab')}>
        <thead>
          <tr>
            <th>Shark's Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Trade transaction %</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionsShark.length > 0  && viewTransactionsShark.map((transaction, index) => (
            <TransactionItem key={index} data={transaction} />
          ))}
        </tbody>
      </table>
      <div id={cx('transaction-table__pagination')}>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={cx('break-me')}
          pageCount={Math.ceil(transactionsSharkRemaining.length / NUMBER_ITEM_DISPLAY)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={paginationState - 1}
          containerClassName={cx('pagination')}
          activeClassName={cx('active')}
        />
      </div>
    </div>
  );
}

export default SettingTrading;
