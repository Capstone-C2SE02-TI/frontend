import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CopyOverview.module.scss';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputNumber, Space } from 'antd';
import { TransactionResponse } from '~/configs/api';
import { toast } from 'react-toastify';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { useDispatch, useSelector } from 'react-redux';
import { MIDDLE_CONTRACT_ABI, MIDDLE_CONTRACT_ADDRESS } from '~/abi';
import axios from 'axios';
import { ethers } from 'ethers';
import ModalNotify from '~/components/ModalNotify/ModalNotify';
import { saveUserBuyingMetadata } from '~/modules/user/auth/authSlice';

const cx = classNames.bind(styles);

const CopyOverview = () => {
  const [isOpenSendFund, setIsOpenSendFund] = useState(false);
  const [amountData, setAmountData] = useState(0);
  const [openModalSucceed, setOpenModalSucceed] = useState(false);
  const walletAddress = useSelector(getAddressMetaMask);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuto = () => {
    navigate('/copy-trading');
  };

  const handleManual = () => {
    navigate('/setting/trading');
  }

  return (
    <div className={cx('containerfluid-copy-overview')}>
      <div className={cx('container-copy-overview')}>
        <div className={cx('box-copy-overview')}>
          <h5>Manual Trade</h5>
          <ul>
            <li>Easy transaction customization</li>
            <li>Invest with your knowledge</li>
            <li>Stop trades easily</li>
            <li>Deposit to get started</li>
          </ul>

          <Button className={cx('btn-start')} onClick={handleManual} linearGradientPrimary>
            Start
          </Button>
        </div>
        <div className={cx('box-copy-overview')}>
          <h5>Auto Trade</h5>
          <ul>
            <li>Generate passive income</li>
            <li>Suitable for beginners</li>
            <li>Auto invest for beginners</li>
            <li>Deposit to get started</li>
          </ul>
          <Button className={cx('btn-start')} onClick={handleAuto} linearGradientPrimary>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CopyOverview;
