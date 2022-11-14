import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './TransactionSharkItem.module.scss'
import { convertStringToTimeCurrent, numberWithCommas } from '~/helpers';

const cx = classNames.bind(styles);

function TransactionSharkItem({ data, index, sharkAddress }) {

    const handleTransactionTo = useCallback(() => {
        if (sharkAddress === data.to) {
            return `${data.from} → Wallet`;
        }
        else {
            return `Wallet → ${data.to}  `;
        }
    }, [data.from, data.to, sharkAddress]);

    return (
        <tr className={cx('transaction-shark__tr')}>
            <td>{convertStringToTimeCurrent(data.timeStamp)}</td>
            <td>shark #1</td>
            <td>
                <a href={`https://etherscan.io/tx/${data.hash}`} rel="noopener noreferrer" target="_blank">
                    {handleTransactionTo()}
                </a>
            </td>
            <td>
                {numberWithCommas(data.numberOfTokens) + ' ' + data.tokenSymbol}
                <p>{data.pastPrice === 0 ? 0 : data.pastPrice.toFixed(3)}</p>
            </td>
            <td>{data.presentPrice === 0 ? 0 : data.presentPrice.toFixed(3)}</td>

        </tr>
    )
}
export default TransactionSharkItem;