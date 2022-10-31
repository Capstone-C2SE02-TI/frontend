import React from 'react';
import classNames from 'classnames/bind';
import styles from './SwapToken.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SwapToken() {

    return (
        <section className={cx('container-swap')}>
            <div className={cx('box-swap')}>
                <div className={cx('box-swap__content')}>
                    <h1>Swap</h1>
                    <span>Trade tokens in an instant</span>
                </div>
                <div className={cx('swap-currency__input')}>
                    <div className={cx('swap-currency__text')}>
                        <div className={cx('swap-text__token')}>
                            <p>logo</p>
                            <p>ETH</p>
                            <p>--</p>
                        </div>
                        <div className={cx('swap-text__balance')}>
                            <p>Blance: 0</p>
                        </div>
                    </div>
                    <input
                    />
                </div>

            </div>
        </section>
    );
}

export default SwapToken;
