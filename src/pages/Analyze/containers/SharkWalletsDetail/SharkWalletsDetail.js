import styles from './SharkWalletsDetail.module.scss';
import classNames from 'classnames/bind';
import NavBarSharkWalletsCrypto from '../../components/NavBarSharkWalletsCrypto';
import {  useState} from 'react';
import SharkTransactionHistory from '../SharkTransactionHistory';
import SharkWalletCrypto from '../SharkWalletCrypto';

const cx = classNames.bind(styles);

function SharkWalletsDetail() {

    const [currentTabSharkWallet, setCurrentTabSharkWallet] = useState('crypto');

     const handleChangeTabSharkWallet = (tabSharkWallet) => {
         setCurrentTabSharkWallet(tabSharkWallet);
     };

    return (
        <div className={cx('shark-crypto')}>
            <NavBarSharkWalletsCrypto onChangeTab={handleChangeTabSharkWallet} currentTAb={currentTabSharkWallet} />
            <SharkWalletCrypto currentTabSharkWallet={currentTabSharkWallet} />
            <SharkTransactionHistory currentTabSharkWallet={currentTabSharkWallet} />
        </div>
    );
}

export default SharkWalletsDetail;
