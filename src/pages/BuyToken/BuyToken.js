import React from 'react';
import classNames from 'classnames/bind';
import styles from './BuyToken.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function BuyToken() {
    let navigate = useNavigate();
    function navigateSwap() {
        navigate('/swap-token')
    }
    return (
        <section className={cx('container-banner')}>
            <div className={cx('popup-buy')}>
                <h1>Start your plan following sharks</h1>
                <h2>Yearly</h2>
                <div className={cx('popup-buy__content')}>
                    <div className={cx('box-content')}>
                        <h4>Professional <span>(Save 85%)</span></h4>
                        <p>Provide rich data about Crypto Market. It's suitable for professional investors.</p>
                    </div>
                    <ul className={cx('nav-benefit')}>
                        <li>"Shark wallet" Crypto holder</li>
                        <li>"Shark wallet" Transaction history</li>
                        <li>"Shark wallet" Detail information</li>
                        <li>"Support (1-1)</li>
                    </ul>
                    <h5>99 TI<p>/month</p></h5>
                    <div className={cx('btn-swap')}>
                        <button onClick={navigateSwap}>Swap now</button>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default BuyToken;
