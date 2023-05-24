import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './ListTradingSharkAdd.module.scss';
import { io } from 'socket.io-client';
import Button from '~/components/Button/Button';
import { useSelector } from 'react-redux';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const ListTradingSharkAdd = () => {
  const socket = io('http://localhost:4001/');

  const [pairAutoList, setPairAutoList] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [dataTxHash, setDataTxHash] = useState([])

  const walletAddress = useSelector(getAddressMetaMask);
  const userAddress = localStorage.getItem("eth_address");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPairList() {
      const response = await fetch(`http://localhost:4000/trading/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: userAddress,
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

  const handleDelete = async (data) => {
    // setAddress(dataSharkFollowed.walletAddress)
    console.log('data', data);
    try {
      const response = await fetch(`http://localhost:4000/trading/delete-trade`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "fromToken": data.fromToken,
            "toToken": data.toToken,
            "sharkAddress": data.sharkAddress,
            "userAddress": userAddress,
            "ethAmount": data.ethAmount,
          },
        )
      });
      const result = await response.json();
      console.log("result", result);
      toast.dismiss();
      if (result.message === "success") {
        navigate('/list-shark-trading')
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDisplay = () => {
    if (isDisplay === true) {
      setIsDisplay(false)
    } else {
      setIsDisplay(true)
    }
  }

  return (
    <div className={cx('ListTradingSharkAdd')}>
      <h1>List shark auto trading</h1>
      <table className={cx('ListTradingSharkAdd-table')}>
        <thead>
          <tr className={cx('ListTradingSharkAdd-tr')}>
            <th className={cx('ListTradingSharkAdd-th')}>SHARK#</th>
            <th className={cx('ListTradingSharkAdd-th')}>PAIR TOKEN</th>
            <th className={cx('ListTradingSharkAdd-th')}>TRANSACTION QUANTITY</th>
            <th className={cx('ListTradingSharkAdd-th')}>BNB SENDED</th>
            <th className={cx('ListTradingSharkAdd-th')}>STATUS</th>
            <th className={cx('ListTradingSharkAdd-th')}>DETAIL</th>
            <th className={cx('ListTradingSharkAdd-th')}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {pairAutoList.map((data) => {
            return (
              <Fragment>
                <tr className={cx('ListTradingSharkAdd-tr')}>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <p className={cx('ListTradingSharkAdd-p')}>Shark #{data.sharkId}</p>
                    <span className={cx('ListTradingSharkAdd-span')}>{data.sharkAddress}</span>
                  </td>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <span className={cx('ListTradingSharkAdd-span')}>{data.fromSymbol}\{data.toSymbol} </span>
                  </td>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <span className={cx('ListTradingSharkAdd-span')}>{data.txhash.length}</span>
                  </td>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <span className={cx('ListTradingSharkAdd-span')}>{data.ethAmount + " "}BNB</span>
                  </td>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <span className={cx('ListTradingSharkAdd-span')}>{data.status ? "Success" : "Fail"}</span>
                  </td>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <Button success className={cx('btn-detail--auto')} onClick={handleDisplay}>
                      Detail
                    </Button>
                  </td>
                  <td className={cx('ListTradingSharkAdd-td')}>
                    <Button error className={cx('btn-delete--auto')} onClick={() => handleDelete(data)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default ListTradingSharkAdd;
