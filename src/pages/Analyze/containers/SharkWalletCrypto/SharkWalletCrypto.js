import styles from './SharkWalletCrypto.module.scss';
import classNames from 'classnames/bind';
import SharkWalletCryptoItem from '../../components/SharkWalletCryptoItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCryptoSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import {
    sharkCryptoSelector,
    sharkCryptoStatusSelector,
    sharkWalletIdSelector,
} from '~/modules/SharkWallet/selector';
import { Spin } from 'antd';
const cx = classNames.bind(styles);

function SharkWalletCrypto({ currentTabSharkWallet }) {
    const dispatch = useDispatch();

    const cryptosSharkWallet = useSelector(sharkCryptoSelector);
    const sharkCryptoStatus = useSelector(sharkCryptoStatusSelector);
    const sharkIdSelected = useSelector(sharkWalletIdSelector);

    useEffect(() => {
        dispatch(fetchCryptoSharkWallet(sharkIdSelected));
    }, [dispatch, sharkIdSelected]);


    console.log(cryptosSharkWallet)
    return (
        currentTabSharkWallet === 'crypto' &&
        (sharkCryptoStatus === 'loading' ? (
            <Spin>
                <table className={cx('table-shark__crypto')}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Crypto</th>
                            <th>Quantity</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptosSharkWallet.map((crypto, index) => {
                            if (Object.keys(crypto).length !== 0) {
                                return <SharkWalletCryptoItem data={crypto} index={index} key={index} />;
                            }
                        })}
                    </tbody>
                </table>
            </Spin>
        ) : (
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
                    {cryptosSharkWallet.length === 0 && <div className="text-center">No data</div>}
                    {cryptosSharkWallet.map((crypto, index) => {
                        if (Object.keys(crypto).length !== 0) {
                            return <SharkWalletCryptoItem data={crypto} index={index} key={index} />;
                        }
                    })}
                </tbody>
            </table>
        ))
    );
}

export default SharkWalletCrypto;
