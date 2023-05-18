import classNames from 'classnames/bind';
import styles from './TransactionItem.module.scss';
import Button from '~/components/Button/Button';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { MIDDLE_CONTRACT_ADDRESS } from '~/abi';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { useSelector } from 'react-redux';
import { MIDDLE_CONTRACT_ABI } from '~/abi';
import { TransactionResponse } from '~/configs/api';
import axios from 'axios';
import { InputNumber } from 'antd';

const cx = classNames.bind(styles);

function TransactionItem({ data }) {
  const [inputData, setInputData] = useState('');
  const [amountValue, setAmount] = useState(0);
  const walletAddressUser = useSelector(getAddressMetaMask);

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
        console.log(amountValue.toString());
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
          toast.loading('Confirm trade ...');

          checkTransactionConfirm(txhash).then((result) => {
            if (result) {

              const handleRequestStatus = async () => {
              toast.dismiss();

                const tradingStatus = await axios.get(TransactionResponse(txhash));
                if (tradingStatus.data.result.isError === '0') {
                  toast.success('Trade successfully');
                } else {
                  toast.error('Trade failed');
                }
              };
              // handleRequestStatus();
              setTimeout(handleRequestStatus, 6000);
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
    setAmount(value)
  };
  return (
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
        <InputNumber
          defaultValue={0}

          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          onChange={onChange}
        />
      </td>
      <td>
        <p className={cx(isTransactionBuy ? 'buy' : 'sell')}>{isTransactionBuy ? 'BUY' : 'SELL'}</p>
      </td>

      <td>
        <p style={{ display: 'flex' }}>
          <Button outline small onClick={handleTrade}>
            Trade
          </Button>
        </p>
      </td>
    </tr>
  );
}

export default TransactionItem;
