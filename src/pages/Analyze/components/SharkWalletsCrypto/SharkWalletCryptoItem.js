import styles from './SharkWalletCryptoItem';
import classNames from 'classnames/bind';
import { StarIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function SharkWalletCryptoItem () {
    
    return (
        <tr>
            <td>icon</td>
            <td>$600,000,000</td>
            <td>2.36%</td>
            <td><StarIcon/></td>
        </tr>
        
    );
}

export default SharkWalletCryptoItem;
