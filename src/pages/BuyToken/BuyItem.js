import React from 'react';
import classNames from 'classnames/bind';
import styles from './BuyToken.module.scss';
import { useSelector } from 'react-redux';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import Button from '~/components/Button';
import { memo, useState } from 'react';

const cx = classNames.bind(styles);

function BuyItem({ handleApprove, upgradePremium, premiumPrice }) {
    const [approve, setApprove] = useState(false);
    const smartContractInfo = useSelector(smartContractInfoSelector);

    const handleToggleApprove = () => {
        console.log("approve");
        setApprove(true);
    };

    return (
        <div className={cx('popup-buy')}>
            <h1>Balance: {smartContractInfo.balance} TI</h1>
            {/* <h2>Yearly: {smartContractInfo.ratio}</h2> */}
            <div className={cx('popup-buy__content')}>
                <div className={cx('box-content')}>
                    {/* <h4>
                                    Professional <span>(Save 85%)</span>
                                </h4> */}
                    <p>Provide rich data about Crypto Market. It's suitable for professional investors.</p>
                </div>
                <ul className={cx('nav-benefit')}>
                    <li>"Shark wallet" Crypto holder</li>
                    <li>"Shark wallet" Transaction history</li>
                    <li>"Shark wallet" Detail information</li>
                    <li>"Support (1-1)</li>
                </ul>
                <h5>
                    {premiumPrice.price} TI<p>/{premiumPrice.time} month</p>
                </h5>
                <div className={cx('btn-swap')}>
                    {!approve ? (
                        <Button
                            linearGradientPrimary
                            onClick={() => handleApprove(premiumPrice.price, handleToggleApprove)}
                        >
                            Approve
                        </Button>
                    ) : (
                        <Button linearGradientPrimary onClick={() => upgradePremium(premiumPrice.price)}>
                            Upgrade Premium
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(BuyItem);
