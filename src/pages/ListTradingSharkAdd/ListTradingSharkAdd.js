import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListTradingSharkAdd.module.scss';
import { io } from 'socket.io-client';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const ListTradingSharkAdd = () => {
  const socket = io('http://localhost:4001/');

  let pairAutoList = [];

  useEffect(() => {
    socket.on("pair-transactions", (data) => {
      pairAutoList = data;
      console.log(pairAutoList);
    })

  }, []);

  console.log(pairAutoList);

  return (
    <div className={cx("ListTradingSharkAdd")}>
      <h1>List shark auto trading</h1>
      <table className={cx("ListTradingSharkAdd-table")}>
        <thead>
          <tr className={cx("ListTradingSharkAdd-tr")}>
            <th className={cx("ListTradingSharkAdd-th")}>
              SHARK#
            </th>
            <th className={cx("ListTradingSharkAdd-th")}>
              FROM TOKEN
            </th>
            <th className={cx("ListTradingSharkAdd-th")}>
              TO TOKEN
            </th>
            <th className={cx("ListTradingSharkAdd-th")}>
              ETH SENDED
            </th>
            <th className={cx("ListTradingSharkAdd-th")}>
              STATUS
            </th>
            <th className={cx("ListTradingSharkAdd-th")}>
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={cx("ListTradingSharkAdd-tr")}>
            <td className={cx("ListTradingSharkAdd-td")}>
              <p className={cx("ListTradingSharkAdd-p")}>Shark 1</p>
              <span className={cx("ListTradingSharkAdd-span")}>0xa946592bee76E7258444d053773f51e366B34c3C</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>symbol token from</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>symbol token to</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>So luong eth sender</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>Success</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <Button error className={cx("btn-delete--auto")}>Delete</Button>
            </td>
          </tr>
          <tr className={cx("ListTradingSharkAdd-tr")}>
            <td className={cx("ListTradingSharkAdd-td")}>
              <p className={cx("ListTradingSharkAdd-p")}>Shark 1</p>
              <span className={cx("ListTradingSharkAdd-span")}>0xa946592bee76E7258444d053773f51e366B34c3C</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>symbol token from</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>symbol token to</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>So luong eth sender</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>Success</span>
            </td>
          </tr>
          <tr className={cx("ListTradingSharkAdd-tr")}>
            <td className={cx("ListTradingSharkAdd-td")}>
              <p className={cx("ListTradingSharkAdd-p")}>Shark 1</p>
              <span className={cx("ListTradingSharkAdd-span")}>0xa946592bee76E7258444d053773f51e366B34c3C</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>symbol token from</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>symbol token to</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>So luong eth sender</span>
            </td>
            <td className={cx("ListTradingSharkAdd-td")}>
              <span className={cx("ListTradingSharkAdd-span")}>Success</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default ListTradingSharkAdd;
