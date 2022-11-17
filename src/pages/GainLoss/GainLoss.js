import React from 'react';
import classNames from 'classnames/bind';
import styles from './GainLoss.module.scss';
import GainLossShark from './components/GainLossShark/GainLossShark';
import GainLossCrypto from './components/GainLossCrypto/GainLossCrypto';

const cx = classNames.bind(styles);

function GainLoss() {
    return (
        <section className={cx('market-change')}>
            <div>
                <GainLossShark />
            </div>
            <div>
                <GainLossCrypto />
            </div>
        </section>
    );
}

export default GainLoss;
