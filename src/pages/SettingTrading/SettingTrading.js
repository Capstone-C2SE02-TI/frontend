import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './SettingTrading.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import { sharkFollowedSelector } from '~/modules/SharkFollowed/selector';
import TransactionItem from './components/TransactionItem';
import { sliceArrayToPagination } from '~/helpers';
import { useMemo } from 'react';
import Loading from '~/components/Loading/Loading';
import LoadingCustomize from '~/components/LoadingCustomize/LoadingCustomize';
import { Spin } from 'antd';
const cx = classNames.bind(styles);
const NUMBER_ITEM_DISPLAY = 10;
function SettingTrading() {
  const ethAddress = localStorage.getItem('eth_address');
  const dispatch = useDispatch();
  const sharkFolloweds = useSelector(sharkFollowedSelector);
  const [transactionsShark, setTransactionsShark] = useState([]);
  const [transactionsSharkRemaining, setTransactionsSharkRemaining] = useState([]);
  const [paginationState, setPaginationState] = useState(1);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    dispatch(fetchSharkFollowed(ethAddress));
  }, [dispatch, ethAddress]);

  useEffect(() => {
    if (sharkFolloweds.length > 0) {
      async function fetchData() {
        const promises = [];
        setLoadingState(true)
        for (let i = 0; i < sharkFolloweds.length; i++) {
          let formData = new FormData();
          formData.append('address', sharkFolloweds[i].walletAddress);
          // const data = {
          //   address: sharkFolloweds[i].walletAddress,
          //   contract_address: '',
          //   pages: 1,
          // }
          const response = await fetch(`/shark/latest_tx/`, {
            method: 'POST',

            body: formData
          });
          const result = await response.json();
          promises.push({ sharkId: sharkFolloweds[i].sharkId, walletAddress: sharkFolloweds[i].walletAddress, data: result.TXs });
        }

        const results = await Promise.all(promises);
        // console.log(results);
        setLoadingState(false);
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
        return transaction.data?.map(d => {
          return {
            ...d,
            sharkId: transaction.sharkId,
            walletAddress: transaction.walletAddress
          }
        })
      })
      let transactionSlice = [];
      newTransactionsAddSharkId?.forEach(transaction => {
        if(transaction) {

          transactionSlice.push(...transaction)
        }
      } )
      setTransactionsSharkRemaining(transactionSlice)
      return sliceArrayToPagination(transactionSlice, paginationState, NUMBER_ITEM_DISPLAY);
    
    
  }, [transactionsShark, paginationState]);

  return (
    <div style={{padding: '46px'}}>
     
      <table className={cx('setting-trading-shark-tab')}>
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>Crypto</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionsShark.length > 0 && viewTransactionsShark.map((transaction, index) => (
            <TransactionItem key={index} data={transaction} />
          ))}
        </tbody>
      </table>
      {loadingState && <LoadingCustomize>
        <Spin />
      </LoadingCustomize>}
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
