import styles from '././SharkWalletsCrypto.module.scss';
import classNames from 'classnames/bind';
import { StarIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function SharkWalletCryptoItem () {
    
    return (
        <tr className={cx('tr-crypto__item')}>
            <td>icon</td>
            <td>$600,000,000</td>
            <td>2.36%</td>
            <td><StarIcon/></td>
        </tr>
        
    );
}

export default SharkWalletCryptoItem;
