import styles from '././SharkWalletsCrypto.module.scss';
import classNames from 'classnames/bind';
import CryptoItem from './CryptoItem';

const cx = classNames.bind(styles);


function SharkWalletCryptoItem () {
    
    return (
        <tr className={cx('tr-crypto__item')}>
            <td>#1</td>
            <CryptoItem/>
            <td>450,000</td>
            <td>$450,000(100%)</td>
        </tr>
        
    );
}

export default SharkWalletCryptoItem;
