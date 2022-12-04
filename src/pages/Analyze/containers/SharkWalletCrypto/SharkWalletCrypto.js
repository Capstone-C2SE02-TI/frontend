import styles from './SharkWalletCrypto.module.scss';
import classNames from 'classnames/bind';
import SharkWalletCryptoItem from '../../components/SharkWalletCryptoItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchCryptoSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import {
    sharkCryptoSelector,
    sharkCryptoStatusSelector,
    sharkWalletIdSelector,
    sharkRemainingSelector,
    cryptoRemainingSelector,
} from '~/modules/SharkWallet/selector';
import { Spin } from 'antd';
import NoData from '~/components/NoData';
const cx = classNames.bind(styles);

function SharkWalletCrypto({ currentTabSharkWallet }) {
    const dispatch = useDispatch();

    const cryptosSharkWallet = useSelector(cryptoRemainingSelector);
    const sharkCryptoStatus = useSelector(sharkCryptoStatusSelector);
    const sharkIdSelected = useSelector(sharkWalletIdSelector);
    const sharksCoin = useSelector(sharkRemainingSelector);

    const totalAssetCrypto = useMemo(() => {
        const total = cryptosSharkWallet?.reduce((totalAsset, crypto) => {
            return crypto?.total ? totalAsset + crypto.total : totalAsset;
        }, 0);
        return total;
    }, [cryptosSharkWallet]);

    useEffect(() => {
        if (sharkIdSelected) dispatch(fetchCryptoSharkWallet(sharkIdSelected));
    }, [dispatch, sharkIdSelected]);


    return (
        currentTabSharkWallet === 'crypto' && (
            <Spin spinning={sharkCryptoStatus === 'loading' ? true : false}>
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
                        {sharksCoin.length > 0 &&
                            cryptosSharkWallet.length > 0 &&
                            cryptosSharkWallet
                                .slice()
                                .filter((crypto) => crypto.total)
                                .sort((prev, next) => {
                                    return next?.total - prev?.total;
                                })
                                .map((crypto, index) => {
                                    return (
                                        <SharkWalletCryptoItem
                                            data={crypto}
                                            index={index}
                                            key={index}
                                            totalAssetCrypto={totalAssetCrypto}
                                        />
                                    );
                                })}
                    </tbody>
                </table>
                {sharkCryptoStatus !== 'loading' && (sharksCoin.length === 0 || cryptosSharkWallet.length === 0) && (
                    <NoData />
                )}
            </Spin>
        )
    );
}

export default SharkWalletCrypto;
