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

const cx = classNames.bind(styles);

function TransactionItem({ data }) {
  const [inputData, setInputData] = useState('');
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
      toast.loading('copy trading hash');

      let formData = new FormData();
      formData.append('buy_token_address', data.contractAddress);
      formData.append('receiver', data.walletAddress);
      formData.append('chain_id', 5);

      const response = await fetch(`/copyTrading/hash/`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      toast.dismiss();
      if (result.input) {
        toast.success(result.message);
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
      console.log({ inputData });
      const handleTrade = async () => {
        toast.loading('Confirm trade ...');
        const provider = await new ethers.providers.Web3Provider(window.ethereum);

        // const middleContract = await ethers.getContractAt('middle', MIDDLE_CONTRACT_ADDRESS);
        const user = walletAddressUser;
        const amount = ethers.utils.parseEther('0.001');
        const pancakeswapAddr = '0xeff92a263d31888d860bd50809a8d171709b7b1c';
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
        let gasPrice12 = 2000;
        let params = [
          {
            from: walletAddressUser,
            to: MIDDLE_CONTRACT_ADDRESS,
            gas: BigNumber.from(200000).toHexString(16),
            gasPrice: '0xA2FB405800',
            data: iface.encodeFunctionData('copyTrading', [user, pancakeswapAddr, inputdata, amount]),
          },
        ];
        
        toast.dismiss();
        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
          toast.loading('Trading ...');

          checkTransactionConfirm(txhash).then((result) => {
            if (result) {
              const handleRequestStatus = async () => {
                const tradingStatus = await axios.get(TransactionResponse(txhash));
                console.log({ tradingStatus });
              };
              handleRequestStatus();
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

      <td>50%</td>
      <td>
        <p className={cx(isTransactionBuy ? 'buy' : 'sell')}>{isTransactionBuy ? 'BUY' : 'SELL'}</p>
      </td>

      <td>
        <p style={{ display: 'flex' }}>
          <Button outline small onClick={handleTrade}>
            Trade
          </Button>
          <Button outline small>
            View Detail
          </Button>
          <Button outline small>
            Delete
          </Button>
        </p>
      </td>
    </tr>
  );
}

export default TransactionItem;
