import classNames from 'classnames/bind';
import styles from './TransactionItem.module.scss';
import Button from '~/components/Button/Button';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

function TransactionItem({ data }) {
  const isTransactionBuy = useMemo(() => {
    if (data.walletAddress === data.to) {
        return false;
    }
    else {
        return true;
    }
}, [data.walletAddress, data.to,  data.from]);

  const handleTrade = async() => {
    let formData = new FormData();
    formData.append('buy_token_address', data.contractAddress);
    formData.append('receiver', data.walletAddress);
    formData.append('chain_id', 5);
    const response = await fetch(`/copyTrading/hash/`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <tr className={cx('setting-trading-shark__tr')} >
      <td>
        <p className={cx('setting-trading-shark__tr__name')}>
          {/* <img src={images.userAvatar} alt="shark avatar" /> */}
          <p>
            <p>Shark #{data.sharkId}</p>
            <p>{data.walletAddress}
            </p>
          </p>
        </p>
      </td>
      <td>{data.tokenSymbol}</td>
      
      <td>
        50%
      </td>
      <td>
        <p className={cx(isTransactionBuy ? 'buy': 'sell')}>{isTransactionBuy ? 'BUY' : 'SELL'}</p>
      </td>

      <td>
        <p style={{ display: 'flex' }}>
          <Button outline small onClick={handleTrade}>Trade</Button>
          <Button outline small>View Detail</Button>
          <Button outline small>Delete</Button>
        </p>
      </td>
    </tr>
  )
}

export default TransactionItem