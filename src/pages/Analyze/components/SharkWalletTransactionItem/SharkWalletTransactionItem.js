
import styles from './SharkWalletTransactionItem.module.scss';
import classNames from 'classnames/bind';
import { useCallback } from 'react';
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

    return (
        <tr className={cx('tr-crypto__item')}>
            <td>{data.date}</td>
            <td>{handleTransactionTo()}</td>
            <td>
                {data.numberOfTokens + ' ' + data.symbol}
                <p>{data.pastPrice === 0 ? 0 : data.pastPrice.toFixed(3)}</p>
            </td>
            <td>{data.presentPrice === 0 ? 0 : data.presentPrice.toFixed(3)}</td>
        </tr>
    );
}

export default SharkWalletTransactionItem;