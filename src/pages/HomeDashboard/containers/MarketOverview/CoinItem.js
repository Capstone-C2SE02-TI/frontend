import classNames from 'classnames/bind';
import React from 'react';
import styles from './MarketOverview.module.scss';
import Image from '~/components/Image/Image';
import numberWithCommas from '~/helpers/numberWithCommas';

const cx = classNames.bind(styles);

function coinItem({ index, data, increaseStatus24h, increaseStatus7d }) {
    const classNamesStatusCoin24h = cx(increaseStatus24h ? 'increase' : 'reduce');
    const classNamesStatusCoin7h = cx(increaseStatus7d ? 'increase' : 'reduce');
    return (
        <tr className={cx('tr-home__dashboard')} key={index}>
            <td>{index + 1}</td>
            <td className={cx('pricedata')}>
                <Image width="20" className={cx('imagedata')} src={data.iconURL} alt="logo" />
                <span>
                    {data.name}({data.symbol})
                </span>
            </td>
            <td>${numberWithCommas(data.usd.price.toFixed(5))}</td>
            <td className={classNamesStatusCoin24h}>{Math.round(data.usd.percentChange24h * 100) / 100}%</td>
            <td className={classNamesStatusCoin7h}>{Math.round(data.usd.percentChange7d * 100) / 100}%</td>
            <td>${numberWithCommas(data.usd.volume24h.toFixed(0))}</td>
            <td>${numberWithCommas(data.marketCap.toFixed(0))}</td>
            <td>${numberWithCommas(data.circulatingSupply.toFixed(0))}</td>
        </tr>
    );
}

export default coinItem;
