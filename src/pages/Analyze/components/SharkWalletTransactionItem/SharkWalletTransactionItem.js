
import styles from './SharkWalletTransactionItem.module.scss';
import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { convertDate, convertTime, numberWithCommas } from '~/helpers';

const cx = classNames.bind(styles);

function SharkWalletTransactionItem({ data, sharkAddress }) {
    const handleTransactionTo = useCallback(() => {
        if (sharkAddress === data.to) {
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

    return (
        <tr className={cx('tr-crypto__item')}>
            <td>
                {(convertDate(data.timeStamp * 1000))}
                <p>{convertTime(data.timeStamp * 1000)}</p>
            </td>
            <td>
                <a href={`https://etherscan.io/tx/${data.hash}`} rel="noopener noreferrer" target="_blank">
                    {handleTransactionTo()}
                </a>
            </td>
            <td>{handleTransferTransaction() === true ? <p style={{ color: '#34CF82 ' }}>{"+" + numberWithCommas(data.numberOfTokens) + ' ' + data.tokenSymbol}</p> : <p style={{ color: 'red ' }}>{"-" + numberWithCommas(data.numberOfTokens) + ' ' + data.tokenSymbol}</p>}

                <p>@{data.pastPrice ? data.pastPrice.toFixed(3) : 0}</p>
            </td>
            <td>
                <p>$ {(data.presentPrice * data.numberOfTokens) ? (data.presentPrice * data.numberOfTokens).toFixed(3) : 0}</p>
                <p>@{data.presentPrice ? data.presentPrice.toFixed(3) : 0}</p>
            </td>
        </tr>
    );
}

export default SharkWalletTransactionItem;