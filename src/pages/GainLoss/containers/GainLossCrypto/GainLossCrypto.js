import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../GainLoss.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGainLossCypto } from '~/modules/GainLoss/gainLossSlice';
import { GainLossCryptoSelector } from '~/modules/GainLoss/selector';
import GainLossCryoptoItem from '../../components/GainLossCryptoItem/GainLossCryptoItem';

const cx = classNames.bind(styles);

function GainLossCrypto() {
    const dispatch = useDispatch();
    const gainLossCryptoData = useSelector(GainLossCryptoSelector);

    const [statusGainLossCrypto, setStatusGainLossCrypto] = useState(false);

    useEffect(() => {
        dispatch(fetchGainLossCypto(statusGainLossCrypto ? statusGainLossCrypto : false));
    }, [statusGainLossCrypto, dispatch]);

    const handleGain = () => {
        setStatusGainLossCrypto(false)
    }

    const handleLoss = () => {
        setStatusGainLossCrypto(true)
    }

    return (
        <div className={cx('layout-common-container')}>
            <div className={cx('layout-content')}>
                <h5>CRYPTO</h5>
                <div className={cx('layout-content__btn')}>
                    <button className={cx('btn-gain')} onClick={handleGain}>Gain</button>
                    <button className={cx('btn-loss')} onClick={handleLoss}>Loss</button>
                </div>
            </div>
            <table className={cx('table-gain')}>
                <thead>
                    <tr className={cx('gain-tr')}>
                        <th className={cx('gain-th')}>No.</th>
                        <th className={cx('gain-th')}>Crypto</th>
                        <th className={cx('gain-th')}>Price</th>
                        <th className={cx('gain-th')}>24h %</th>
                    </tr>
                </thead>
                <tbody className={cx('tbody-gain')}>
                    {gainLossCryptoData.length === 0 && <div className="text-center">No data</div>}
                    {gainLossCryptoData.map((trans, index) =>
                        <GainLossCryoptoItem gainLossCryptoData={trans} index={index} status={statusGainLossCrypto} key={index} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GainLossCrypto;
