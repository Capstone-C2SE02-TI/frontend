import React from 'react';
import classNames from 'classnames/bind';
import styles from './GainLoss.module.scss';
import GainLossShark from './containers/GainLossShark/GainLossShark';
import GainLossCrypto from './containers/GainLossCrypto/GainLossCrypto';

const cx = classNames.bind(styles);

function GainLoss() {


    return (
        <section className={cx('market-change')}>
            <div className={cx('col50')}>
                <GainLossShark/>
            </div>
            <div className={cx('col50')}>
                <GainLossCrypto />
            </div>
        </section>
    );
}

export default GainLoss;
