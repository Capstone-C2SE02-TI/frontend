import styles from './SharkWalletsCrypto.module.scss'
import classNames from 'classnames/bind';
import SharkWalletCryptoItem from './SharkWalletCryptoItem';
const cx = classNames.bind(styles);

function SharkWalletsCrypto() {
    return (
        <div className={cx('shark-crypto')}>
            <div className={cx('crypto-list__choose')}>
                <h6>Crypto</h6>
                <h6>Transaction history</h6>
                <h6>Detail info</h6>
            </div>
            <table className={cx('table-shark__crypto')}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Logo</th>
                        <th>Quantity</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                   <SharkWalletCryptoItem/>
                </tbody>
            </table>
        </div>
    );
}

export default SharkWalletsCrypto;
