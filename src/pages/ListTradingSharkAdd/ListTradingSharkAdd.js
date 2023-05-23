import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListTradingSharkAdd.module.scss';
import { io } from 'socket.io-client';
import Button from '~/components/Button/Button';
import { useSelector } from 'react-redux';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';

const cx = classNames.bind(styles);

const ListTradingSharkAdd = () => {
  const socket = io('http://localhost:4001/');

  const [pairAutoList, setPairAutoList] = useState([]);

  const walletAddress = useSelector(getAddressMetaMask);

  useEffect(() => {
    async function fetchPairList() {
      const response = await fetch(`http://localhost:4000/trading/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: walletAddress,
        }),
      });

      const result = await response.json();
      if (result.message === 'success') {
        setPairAutoList(result.data);
      }
    }
    fetchPairList();

    socket.on('pair-transactions', (data) => {
      setPairAutoList(data);
    });
  }, [walletAddress]);

  return (
    <div className={cx('ListTradingSharkAdd')}>
      <h1>List shark auto trading</h1>
      <table className={cx('ListTradingSharkAdd-table')}>
        <thead>
          <tr className={cx('ListTradingSharkAdd-tr')}>
            <th className={cx('ListTradingSharkAdd-th')}>SHARK#</th>
            <th className={cx('ListTradingSharkAdd-th')}>FROM TOKEN</th>
            <th className={cx('ListTradingSharkAdd-th')}>TO TOKEN</th>
            <th className={cx('ListTradingSharkAdd-th')}>ETH SENDED</th>
            <th className={cx('ListTradingSharkAdd-th')}>STATUS</th>
            <th className={cx('ListTradingSharkAdd-th')}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {pairAutoList.map((data) => {
            return (
              <tr className={cx('ListTradingSharkAdd-tr')}>
                <td className={cx('ListTradingSharkAdd-td')}>
                  <p className={cx('ListTradingSharkAdd-p')}>{data.sharkId}</p>
                  <span className={cx('ListTradingSharkAdd-span')}>{data.sharkAddess}</span>
                </td>
                <td className={cx('ListTradingSharkAdd-td')}>
                  <span className={cx('ListTradingSharkAdd-span')}>{data.fromSymbol}</span>
                </td>
                <td className={cx('ListTradingSharkAdd-td')}>
                  <span className={cx('ListTradingSharkAdd-span')}>{data.toSymbol}</span>
                </td>
                <td className={cx('ListTradingSharkAdd-td')}>
                  <span className={cx('ListTradingSharkAdd-span')}>{data.ethAmount}</span>
                </td>
                <td className={cx('ListTradingSharkAdd-td')}>
                  <span className={cx('ListTradingSharkAdd-span')}>{data.status? "True": "False"}</span>
                </td>
                <td className={cx('ListTradingSharkAdd-td')}>
                  <Button error className={cx('btn-delete--auto')}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListTradingSharkAdd;
