import classNames from 'classnames/bind';
import styles from './MarketOverview.module.scss';
import Image from '~/components/Image/Image';
import numberWithCommas from '~/helpers/numberWithCommas';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CoinItem({ index, data, increaseStatus24h, increaseStatus7d }) {
  const navigate = useNavigate();
  const classNamesStatusCoin24h = cx(increaseStatus24h ? 'increase' : 'reduce');
  const classNamesStatusCoin7h = cx(increaseStatus7d ? 'increase' : 'reduce');

  return (
    <tr className={cx('tr-home__dashboard')} key={index} onClick={() => navigate(`/discover/detail/${data.symbol}`)}>
      <td>{index + 1}</td>
      <td className={cx('pricedata')}>
        <Image width="20" className={cx('imagedata')} src={data.iconURL} alt="logo" />
        <div className={cx('priceData-content')}>
          <h6>{data.name}</h6>
          <span>{data.symbol}</span>
        </div>
      </td>
      <td>${String(data.usd.price)}</td>
      <td className={classNamesStatusCoin24h}>{Math.round(data.usd.percentChange24h * 100) / 100}%</td>
      <td className={classNamesStatusCoin7h}>{Math.round(data.usd.percentChange7d * 100) / 100}%</td>
      <td>${numberWithCommas(data.usd.volume24h.toFixed(0))}</td>
      <td>${numberWithCommas(data.marketCap ? data.marketCap?.toFixed(0) : 0)}</td>
      <td>${numberWithCommas(data.circulatingSupply ? data.circulatingSupply.toFixed(0) : 0)}</td>
    </tr>
  );
}

export default CoinItem;
