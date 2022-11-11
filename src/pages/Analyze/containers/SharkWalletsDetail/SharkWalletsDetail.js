import styles from './SharkWalletsDetail.module.scss';
import classNames from 'classnames/bind';
import NavBarSharkWalletsCrypto from '../../components/NavBarSharkWalletsCrypto';
import {  useState} from 'react';
import SharkTransactionHistory from '../SharkTransactionHistory';
import SharkWalletCrypto from '../SharkWalletCrypto';
import SharkDetailInfo from '../SharkDetailInfo';
import { useSelector } from 'react-redux';
import { sharkListSelector } from '~/modules/SharkWallet/selector';

const cx = classNames.bind(styles);

function SharkWalletsDetail() {

    const [currentTabSharkWallet, setCurrentTabSharkWallet] = useState('crypto');

     const handleChangeTabSharkWallet = (tabSharkWallet) => {
         setCurrentTabSharkWallet(tabSharkWallet);
     };
    const sharksCoin = useSelector(sharkListSelector);
    
    return (
        <div className={cx('shark-crypto')}>
            <NavBarSharkWalletsCrypto onChangeTab={handleChangeTabSharkWallet} currentTAb={currentTabSharkWallet} />
            {sharksCoin.length > 0 &&
                <div>
                    <SharkWalletCrypto currentTabSharkWallet={currentTabSharkWallet} />
                    <SharkTransactionHistory currentTabSharkWallet={currentTabSharkWallet} />
                    <SharkDetailInfo currentTabSharkWallet={currentTabSharkWallet} />
                </div>
            }
        </div>
    );
}

export default SharkWalletsDetail;
