import classNames from 'classnames/bind';
import styles from './TransactionItem.module.scss';
import images from "~/assets/images"; import Button from '~/components/Button/Button';
import millify from 'millify';

const cx = classNames.bind(styles);


function TransactionItem({ data }) {
  console.log(data.tokenSymbol.length);
  return (

    <tr className={cx('setting-trading-shark__tr')} >
      <td>
        <p className={cx('setting-trading-shark__tr__name')}>
          <img src={images.userAvatar} alt="shark avatar" />
          <p>
            <p>Shark #{data.sharkId}</p>
            <p>{data.tokenSymbol.length > 10 ? data.tokenSymbol.slice(0,8) : data.tokenSymbol}
            </p>
          </p>
        </p>
      </td>
      <td>{data.transactionIndex}</td>
      <td>{millify(+data.value / +data.transactionIndex, {
        precision: 3,
        decimalSeparator: ',',
      })}</td>
      <td>
        50%

      </td>
      <td>
        <p>$ 2121</p>
        <p>@12121</p>
      </td>

      <td>
        <p style={{ display: 'flex' }}>
          <Button outline small>Trade</Button>
          <Button outline small>View Detail</Button>
          <Button outline small>Delete</Button>
        </p>
      </td>
    </tr>
  )
}

export default TransactionItem