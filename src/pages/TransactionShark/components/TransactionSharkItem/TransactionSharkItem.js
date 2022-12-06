import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './TransactionSharkItem.module.scss'
import { convertStringToTimeCurrent, numberWithCommas } from '~/helpers';

const cx = classNames.bind(styles);

function TransactionSharkItem({ data, index, sharkAddress }) {

    const handleTransactionTo = useCallback(() => {
        // console.log("sharkAdd:" + sharkAddress, "data " + data.to);
        if (sharkAddress.toLowerCase() === data.to.toLowerCase()) {
            return `${data.from} → Wallet`;
        }
        else {
            return `Wallet → ${data.to}  `;
        }
    }, [data.from, data.to, sharkAddress]);
    const handleTransferTransaction = () => {
        if (sharkAddress === data.to) {
            return true;
        } else {
            return false;
        }
    }
    console.log(data);
    return (
        <tr className={cx('transaction-shark__tr')} >
            <td>{convertStringToTimeCurrent(data.timeStamp)}</td>
            <td>shark #{data.sharkId}</td>
            <td>
                <a href={`https://etherscan.io/tx/${data.hash}`} rel="noopener noreferrer" target="_blank">
                    {handleTransactionTo()}
                </a>
            </td>
            <td>{handleTransferTransaction() === true ? <p style={{ color: '#34CF82 ' }}>{"+" + numberWithCommas(data.numberOfTokens) + ' ' + data.tokenSymbol}</p> : <p style={{ color: 'red ' }}>{"-" + numberWithCommas(data.numberOfTokens) + ' ' + data.tokenSymbol}</p>}
                <p>@{String(data.pastPrice === 0 ? 0 : data.pastPrice)}</p>
            </td>
            <td>
                <p>$ {(data.presentPrice * data.numberOfTokens).toFixed(3)}</p>
                <p>@{String(data.presentPrice === 0 ? 0 : data.presentPrice)}</p>
            </td>

        </tr>
    )
}
export default TransactionSharkItem;