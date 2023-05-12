import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CopyOverview.module.scss';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { InputNumber, Space } from 'antd';
import { TransactionResponse } from '~/configs/api';
import { toast } from 'react-toastify';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { useSelector } from 'react-redux';
import { MIDDLE_CONTRACT_ADDRESS } from '~/abi';
import axios from 'axios';
import { ethers } from 'ethers';

const cx = classNames.bind(styles);

const CopyOverview = () => {
  const [isOpenSendFund, setIsOpenSendFund] = useState(false);
  const [amountData, setAmountData] = useState(1000);
  const walletAddress = useSelector(getAddressMetaMask);
    const navigate = useNavigate()
  const handleNavigate = () => {};

  const onRequestClose = () => {
    setIsOpenSendFund(false);
  };
  const onChange = (value) => {
    setAmountData(value);
  };

  const handleSendAmount = async () => {
      const ethAmount = amountData.toString();
      console.log(ethers.utils.parseEther(ethAmount)._hex );
   
    let params = [
      {
        from: walletAddress,
        to: MIDDLE_CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(ethAmount)._hex
      },
    ];
    await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
      toast.loading('Processing send to fund...');

      checkTransactionConfirm(txhash).then((result) => {
        if (result) {
          toast.dismiss();
          console.log('result', result);
          const handleRequestStatus = async () => {
            const approveTokenStatus = await axios.get(TransactionResponse(txhash));
            if (approveTokenStatus.data.result.isError === '0') {
              toast.success('Send amount successfully');
              navigate('/setting/trading');
            } else {
              toast.error('Send amount failed');
            }
          };
          setTimeout(handleRequestStatus, 1000);
        }
      });
    });
  };
  const checkTransactionConfirm = (txhash) => {
    let checkTransactionLop = () => {
      return window.ethereum
        .request({
          method: 'eth_getTransactionReceipt',
          params: [txhash],
        })
        .then((r) => {
          if (r !== null) return 'comfirmned';
          else return checkTransactionLop();
        });
    };
    return checkTransactionLop();
  };
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

          <Button className={cx('btn-start')} onClick={() => setIsOpenSendFund(true)} linearGradientPrimary>
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
          <Button className={cx('btn-start')} linearGradientPrimary>
            Start
          </Button>
        </div>
        <Modal isOpen={isOpenSendFund} onRequestClose={onRequestClose}>
          <div className={cx('content')}>
            <div className={cx('title')}>Amount</div>
            <h4 className={cx('sub-title')}>Send to fund</h4>
            <p className={cx('desc')}>
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span> Amount you want send to fund for trading</span>
            </p>
            <div>
              <InputNumber
                defaultValue={1000}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChange}
                className={cx('input-amount')}
              />
            </div>
            <div className={cx('actions')}>
              <Button primary small onClick={handleSendAmount}>
                OK
              </Button>
              <Button outlineBrow small>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CopyOverview;
