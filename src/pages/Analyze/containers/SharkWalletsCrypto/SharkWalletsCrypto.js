import styles from './SharkWalletsCrypto.module.scss';
import classNames from 'classnames/bind';
import SharkWalletCryptoItem from '../../components/SharkWalletCryptoItem';
import NavBarSharkWalletsCrypto from '../../components/NavBarSharkWalletsCrypto';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCryptoSharkWallet, fetchTransactionHistorySharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { sharkCryptoSelector, sharkCryptoStatusSelector, sharkTransactionHistorySelector, sharkWalletAddressSelector, sharkWalletIdSelector } from '~/modules/SharkWallet/selector';
import Loading from '~/components/Loading';
import SharkWalletTransactionItem from '../../components/SharkWalletTransactionItem';

const cx = classNames.bind(styles);

function SharkWalletsCrypto() {
    const dispatch = useDispatch();

    const cryptosSharkWallet = useSelector(sharkCryptoSelector);
    const sharkCryptoStatus = useSelector(sharkCryptoStatusSelector);
    const sharkIdSelected = useSelector(sharkWalletIdSelector);
    const sharkAddressSelected = useSelector(sharkWalletAddressSelector);
    const sharkTransactionHistory = useSelector(sharkTransactionHistorySelector);

    const [currentTabSharkWallet, setCurrentTabSharkWallet] = useState('crypto');

    useEffect(() => {
        dispatch(fetchCryptoSharkWallet(sharkIdSelected));
        dispatch(fetchTransactionHistorySharkWallet(sharkIdSelected));
    }, [dispatch, sharkIdSelected]);

    const handleChangeTabSharkWallet = (tabSharkWallet) => {
        setCurrentTabSharkWallet(tabSharkWallet);
       
    };

    const renderSharkWalletCrypto = () => {
        return (
            currentTabSharkWallet === 'crypto' && (
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
                        {sharkCryptoStatus === 'loading' ? (
                            <Loading></Loading>
                        ) : (
                            cryptosSharkWallet.map((crypto, index) => {
                                if (Object.keys(crypto).length !== 0) {
                                    return <SharkWalletCryptoItem data={crypto} index={index} key={index} />;
                                }
                            })
                        )}
                    </tbody>
                </table>
            )
        );
    };

    const renderSharkWalletTransactionHistory = () => {
        return (
            currentTabSharkWallet === 'transaction-history' && (
                <table className={cx('table-shark__crypto')}>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Transaction</th>
                            <th>Past Value</th>
                            <th>Past Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sharkCryptoStatus === 'loading' ? (
                            <Loading></Loading>
                        ) : (
                            sharkTransactionHistory.map((transaction, index) => {
                                if (Object.keys(transaction).length !== 0) {
                                    return (
                                        <SharkWalletTransactionItem
                                            data={transaction}
                                            index={index}
                                            key={index}
                                            sharkAddress={sharkAddressSelected}
                                        />
                                    );
                                }
                            })
                        )}
                    </tbody>
                </table>
            )
        );
    }

    return (
        <div className={cx('shark-crypto')}>
            <NavBarSharkWalletsCrypto onChangeTab={handleChangeTabSharkWallet} />
            {renderSharkWalletCrypto()}
            {renderSharkWalletTransactionHistory()}
        </div>
    );
}

export default SharkWalletsCrypto;
  

