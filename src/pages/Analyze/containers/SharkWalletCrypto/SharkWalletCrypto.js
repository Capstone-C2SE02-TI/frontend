import styles from './SharkWalletCrypto.module.scss';
import classNames from 'classnames/bind';
import SharkWalletCryptoItem from '../../components/SharkWalletCryptoItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchCryptoSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { sharkCryptoSelector, sharkCryptoStatusSelector, sharkWalletIdSelector } from '~/modules/SharkWallet/selector';
import { Spin } from 'antd';
const cx = classNames.bind(styles);

function SharkWalletCrypto({ currentTabSharkWallet }) {
    const dispatch = useDispatch();

    const cryptosSharkWallet = useSelector(sharkCryptoSelector);
    const sharkCryptoStatus = useSelector(sharkCryptoStatusSelector);
    const sharkIdSelected = useSelector(sharkWalletIdSelector);

    const totalAssetCrypto = useMemo(() => {
        const total = cryptosSharkWallet?.reduce((totalAsset, crypto) => {
            return crypto?.total ? totalAsset + crypto.total : totalAsset;
        }, 0);
        return total;
    }, [cryptosSharkWallet]);

    useEffect(() => {
        dispatch(fetchCryptoSharkWallet(sharkIdSelected));
    }, [dispatch, sharkIdSelected]);

    return (
        currentTabSharkWallet ==='crypto' &&
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
                    {cryptosSharkWallet.length > 0 ? (
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
                            })
                    ) : (
                        <div className="text-center">No data</div>
                    )}
                </tbody>
            </table>
        </Spin>
    );
}

export default SharkWalletCrypto;
