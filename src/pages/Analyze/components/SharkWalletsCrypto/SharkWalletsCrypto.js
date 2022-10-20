import styles from './SharkWalletsCrypto.module.scss'
import classNames from 'classnames/bind';
import SharkWalletCryptoItem from './SharkWalletCryptoItem';
import NavBarSharkWalletsCrypto from '../NavBarSharkWalletsCrypto';

const cx = classNames.bind(styles);

function SharkWalletsCrypto() {
    return (
        <div className={cx('shark-crypto')}>
            <NavBarSharkWalletsCrypto/>
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
