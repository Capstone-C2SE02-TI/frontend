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

  const onRequestClose = () => {
    setIsOpenSendFund(false);
  };
  const onChange = (value) => {
    setAmountData(value);
  };

  const handleSendAmount = async () => {
    const ethAmount = amountData.toString();

    let params = [
      {
        from: walletAddress,
        to: MIDDLE_CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(ethAmount)._hex,
        // value: ethAmount
      },
    ];
    await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
      toast.loading('Processing send to fund...');

      checkTransactionConfirm(txhash).then((result) => {
        if (result) {
          toast.dismiss();
          const handleRequestStatus = async () => {
            const approveTokenStatus = await axios.get(TransactionResponse(txhash));
            setIsOpenSendFund(false);
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const contractMiddle = await new ethers.Contract(MIDDLE_CONTRACT_ADDRESS, MIDDLE_CONTRACT_ABI, provider);

            const userBuyingMetadata = await contractMiddle.userBuyingMetadata(walletAddress);
            const userBuyingMetadataTransfer = parseInt(userBuyingMetadata.toHexString(16), 16) / 10 ** 18;
            dispatch(saveUserBuyingMetadata(userBuyingMetadataTransfer));

            if (approveTokenStatus.data.result.isError === '0') {
              setOpenModalSucceed(true);
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
                defaultValue={0}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChange}
                className={cx('input-amount')}
              />
            </div>
            <div className={cx('actions')}>
              <Button
                primary
                small
                onClick={() => {
                  handleSendAmount();
                  setIsOpenSendFund(false);
                }}
              >
                OK
              </Button>
              <Button outlineBrow small onClick={() => setIsOpenSendFund(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {openModalSucceed && (
          <ModalNotify
            typeSuccess={true}
            icon={<FontAwesomeIcon icon={faCheck} />}
            isOpen={openModalSucceed}
            title={'Send successfully '}
            description="Redirect to trading"
            onRequestClose={() => {
              setOpenModalSucceed(false);
              navigate('/setting/trading');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CopyOverview;
