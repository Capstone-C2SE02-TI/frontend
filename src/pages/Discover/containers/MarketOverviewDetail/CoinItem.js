import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MarketOverviewDetail.module.scss';
import Image from '~/components/Image/Image';
import ChartCoinItem from '../../components/ChartCoinItem/ChartCoinItem';
import numberWithCommas from '~/helpers/numberWithCommas';

const cx = classNames.bind(styles);

const REDUCING_COLOR = 'rgb(249, 20, 72)';
const INCREASING_COLOR = '#21ce66';

function coinItem({ index, data, increaseStatus24h, increaseStatus7d }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const classNamesStatusCoin24h = cx(increaseStatus24h ? 'increase' : 'reduce');
    const classNamesStatusCoin7h = cx(increaseStatus7d ? 'increase' : 'reduce');
    console.log(data.pricesLast1Month[0]);
    return (
        <tr key={index} onClick={() => navigate(`/discover/detail/${data.symbol}`)}>
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
            <td>
                {data.pricesLast1Month ? (
                    <ChartCoinItem
                        labelTitle={'Last 1 month'}
                        symbol={data.symbol}
                        data={data.pricesLast1Month}
                        theme={data.usd.percentChange24h < 0 ? REDUCING_COLOR : INCREASING_COLOR}
                    />
                ) : (
                    <h2>Chart</h2>
                )}
            </td>
        </tr>
    );
}

export default coinItem;
