import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListTradingSharkAdd.module.scss';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

const ListTradingSharkAdd = () => {
  const socket = io('http://localhost:4001/');

  let pairAutoList = [];

  useEffect(() => {
    socket.on("pair-transactions", (data) =>{
        pairAutoList = data;
        console.log(pairAutoList);
    })
    
  }, []);

  console.log(pairAutoList);

  return <div>ListTradingSharkAdd</div>;
};

export default ListTradingSharkAdd;
