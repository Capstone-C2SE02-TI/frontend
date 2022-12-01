import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../GainLoss.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGainLossShark } from '~/modules/GainLoss/gainLossSlice';
import { GainLossSharkSelector } from '~/modules/GainLoss/selector';
import GainLossSharkItem from '../../components/GainLossSharkItem/GainLossSharkItem';

const cx = classNames.bind(styles);

function GainLossShark() {
    const dispatch = useDispatch();
    const gainLossSharkData = useSelector(GainLossSharkSelector);

    const [statusGainLossShark, setStatusGainLossShark] = useState(false);

    useEffect(() => {
        dispatch(fetchGainLossShark(statusGainLossShark ? statusGainLossShark : false));
        console.log('Gain loss', gainLossSharkData)
    }, [statusGainLossShark, dispatch]);

    const handleGain = () => {
        setStatusGainLossShark(false)
    }
    const handleLoss = () => {
        setStatusGainLossShark(true)
    }
    return (
        <div className={cx('layout-common-container')}>
            <div className={cx('layout-content')}>
                <h5>SHARK WALLET</h5>
                <div className={cx('layout-content__btn')}>
                    <button className={cx('btn-gain')} onClick={handleGain}>Gain</button>
                    <button className={cx('btn-loss')} onClick={handleLoss}>Loss</button>
                </div>
            </div>
            <table className={cx('table-gain')}>
                <thead>
                    <tr className={cx('gain-tr')}>
                        <th className={cx('gain-th')}>No.</th>
                        <th className={cx('gain-th')}>Shark</th>
                        <th className={cx('gain-th')}>Total asset%</th>
                        <th className={cx('gain-th')}>24h %</th>
                    </tr>
                </thead>
                <tbody className={cx('tbody-gain')}>
                    {gainLossSharkData.length === 0 && <div className="text-center">No data</div>}
                    {gainLossSharkData.map((trans, index) =>
                        <GainLossSharkItem gainLossSharkData={trans} index={index} status={statusGainLossShark} key={index} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GainLossShark;
