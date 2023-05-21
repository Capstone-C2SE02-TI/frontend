import classNames from 'classnames/bind';
import styles from './TransactionItem.module.scss';
import Button from '~/components/Button/Button';
import { Fragment, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { MIDDLE_CONTRACT_ADDRESS } from '~/abi';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { useDispatch, useSelector } from 'react-redux';
import { MIDDLE_CONTRACT_ABI } from '~/abi';
import { TransactionResponse } from '~/configs/api';
import axios from 'axios';
import { InputNumber } from 'antd';
import Modal from '~/components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { saveUserBuyingMetadata } from '~/modules/user/auth/authSlice';

const cx = classNames.bind(styles);

function TransactionItem({ data }) {
  const [inputData, setInputData] = useState('');
  const [amountValue, setAmount] = useState(0);
  const [isOpenSendAmount, setIsOpenSendAmount] = useState(false);
  const walletAddressUser = useSelector(getAddressMetaMask);

  const dispatch = useDispatch();

  const isTransactionBuy = useMemo(() => {
    if (data.walletAddress === data.to) {
      return false;
    } else {
      return true;
    }
  }, [data.walletAddress, data.to, data.from]);

  //trade to get input
  const handleTrade = async () => {
    try {
      toast.loading('Get input data loading ...');

      let formData = new FormData();
      formData.append('buy_token_address', data.contractAddress);
      formData.append('receiver', walletAddressUser);
      formData.append('chain_id', 5);
      const response = await fetch(`/copyTrading/hash/`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      toast.dismiss();
      if (result.input) {
        setInputData(result.input);
      } else {
        toast.warning(result.message);
      }
    } catch (err) {
      // toast.error(err)
      console.log(err);
    }
  };

  useEffect(() => {
    if (inputData) {
      const handleTrade = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);

        // const middleContract = await ethers.getContractAt('middle', MIDDLE_CONTRACT_ADDRESS);
        const user = walletAddressUser;
        //so tien nguoi ta ban
        const amount = ethers.utils.parseEther(amountValue.toString());
        const pancakeswapAddr = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
        const inputdata = inputData;
        // const [owner] = await hre.ethers.getSigners();
        // console.log(owner.address);
        // const tx = await middleContract
        // .connect(owner)
        // .copyTrading(user, pancakeswapAddr, inputdata, amount, {
        //     gasLimit: 300000, // set your desired gas limit here,
        // })

        // await tx.wait();

        let iface = new ethers.utils.Interface(MIDDLE_CONTRACT_ABI);
        const contractMiddle = await new ethers.Contract(MIDDLE_CONTRACT_ADDRESS, MIDDLE_CONTRACT_ABI, provider);
        let params = [
          {
            from: walletAddressUser,
            to: MIDDLE_CONTRACT_ADDRESS,
            gas: BigNumber.from(200000).toHexString(16),
            gasPrice: '0x104C533C00',
            data: iface.encodeFunctionData('copyTrading', [user, pancakeswapAddr, inputdata, amount]),
          },
        ];

        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
          toast.loading('Confirmed trade ...');

          checkTransactionConfirm(txhash).then((result) => {
            if (result) {
              const handleRequestStatus = async () => {
                toast.dismiss();

                const userBuyingMetadata = await contractMiddle.userBuyingMetadata(walletAddressUser);
                const userBuyingMetadataTransfer = parseInt(userBuyingMetadata.toHexString(16), 16) / 10 ** 18;
                console.log(userBuyingMetadataTransfer);
                dispatch(saveUserBuyingMetadata(userBuyingMetadataTransfer));

                const tradingStatus = await axios.get(TransactionResponse(txhash));
                if (tradingStatus.data.result.isError === '0') {
                  toast.success('Trade successfully');
                } else {
                  toast.error('Trade failed');
                }
              };
              // handleRequestStatus();
              setTimeout(handleRequestStatus, 3000);
            }
          });
        });
      };

      handleTrade();
    }
  }, [inputData]);
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

  const onChange = (value) => {
    setAmount(value);
  };
  return (
    <Fragment>
      <tr className={cx('setting-trading-shark__tr')}>
        <td>
          <p className={cx('setting-trading-shark__tr__name')}>
            {/* <img src={images.userAvatar} alt="shark avatar" /> */}
            <p>
              <p>Shark #{data.sharkId}</p>
              <p>{data.walletAddress}</p>
            </p>
          </p>
        </td>
        <td>{data.tokenSymbol}</td>
        <td>
          <p className={cx(isTransactionBuy ? 'buy' : 'sell')}>{isTransactionBuy ? 'BUY' : 'SELL'}</p>
        </td>

        <td>
          <p style={{ display: 'flex', justifyContent: 'center' }}>
            <Button outline small onClick={() => setIsOpenSendAmount(true)}>
              Trade
            </Button>
          </p>
        </td>
      </tr>

      <Modal isOpen={isOpenSendAmount} onRequestClose={() => setIsOpenSendAmount(false)}>
        <div className={cx('content')}>
          <div className={cx('title')}>Trade amount</div>
          <h4 className={cx('sub-title')}>Send to transaction</h4>
          <p className={cx('desc')}>
            <FontAwesomeIcon icon={faCircleExclamation} />
            <span> Amount you want send to transaction</span>
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
                setIsOpenSendAmount(false);
                handleTrade();
              }}
            >
              OK
            </Button>
            <Button outlineBrow small onClick={() => setIsOpenSendAmount(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default TransactionItem;
