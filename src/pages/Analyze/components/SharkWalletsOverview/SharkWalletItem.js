import styles from './SharkWalletsOverview.module.scss';
import classNames from 'classnames/bind';
import { StarIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function SharkWalletCoin () {
    
    return (
        <tr>
            <td>shark1</td>
            <td>$600,000,000</td>
            <td>2.36%</td>
            <td><StarIcon/></td>
        </tr>
        
    );
}

export default SharkWalletCoin;
