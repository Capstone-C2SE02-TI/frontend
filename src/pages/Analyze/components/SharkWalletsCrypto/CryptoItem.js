import React from 'react';
import classNames from 'classnames/bind';
import styles from './SharkWalletsCrypto.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function CryptoItem () {
    return (
        <ul className={cx('crypto-item')}>
            <li>
                <div className={cx('cryto-item__info')}>
                    <Image width="22" className={cx('people-image')} src={images.people} alt="logo" />
                    <p>USDT (Tether) - $1.00</p>
                </div>
            </li>
            <li>
                <span>Rank#3</span>
            </li>
            <li>
                <span>Defi</span>
                <span>Defi</span>
                <span>Defi</span>
            </li>
        </ul>
    );
}

export default CryptoItem;
