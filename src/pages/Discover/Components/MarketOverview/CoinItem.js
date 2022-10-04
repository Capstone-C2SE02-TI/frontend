import classNames from 'classnames/bind';
import React from 'react';
import styles from './MarketOverview.module.scss';
import Image from '~/components/Image/Image';
import ChartOverview from '../AssetCoins/ChartOverview';
import images from '~/assets/images';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function coinItem({ index, data }) {

    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td className={cx('pricedata')}>
                <Image width="20" className={cx('imagedata')} src={data.iconURL} alt="logo" />
                <span>
                    {data.name}
                    ({data.symbol})
                </span>
            </td>
            <td>$1,454.91</td>
            <td>{Math.round((data.usd.percentChange24h) * 100) / 100}%</td>
            <td>{Math.round((data.usd.percentChange7d) * 100) / 100 }%</td>
            <td>${data.usd.volume24h.toFixed(0)}</td>
            <td>${data.marketCap.toFixed(0)}</td>
            <td>{data.circulatingSupply.toFixed(0)}{' '}{data.symbol}</td>
            <td><ChartOverview/></td>
        </tr>
    );
}

export default coinItem;
