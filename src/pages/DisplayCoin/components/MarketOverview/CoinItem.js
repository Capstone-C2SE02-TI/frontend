import classNames from 'classnames/bind';
import React from 'react';
import styles from './MarketOverview.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function CoinItem({ index, coin }) {
    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td className={cx('priceCoin')}>
                <Image width="20" className={cx('imageCoin')} src={coin.iconURL} alt="logo" />
                <span>
                    {coin.name}
                    ({coin.symbol})
                </span>
            </td>
            <td>$1,454.91</td>
            <td>{Math.round((coin.usd.percentChange24h) * 100) / 100}%</td>
            <td>{Math.round((coin.usd.percentChange7d) * 100) / 100 }%</td>
            <td>${coin.usd.volume24h.toFixed(0)}</td>
            <td>${coin.marketCap.toFixed(0)}</td>
            <td>{coin.circulatingSupply.toFixed(0)}{' '}{coin.symbol}</td>
            <td>...</td>
            <td>
                <FontAwesomeIcon className={cx('iconFollow')} icon={faStar} />
            </td>
        </tr>
    );
}

export default CoinItem;
