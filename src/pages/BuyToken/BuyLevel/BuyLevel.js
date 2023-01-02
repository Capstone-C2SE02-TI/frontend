import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { smartContractInfoSelector } from '~/modules/user/auth/selectors';
import styles from './BuyLevel.module.scss';
const cx = classNames.bind(styles);

function BuyLevel({ handleApprove, handleUpgradePremium, premiumPrice, times }) {
    const [approve, setApprove] = useState(false);
    const smartContractInfo = useSelector(smartContractInfoSelector);

    const handleToggleApprove = () => {
        console.log('approve');
        setApprove(true);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('plan-card')}>
                <h2>
                    Upgrade Premium TI: {smartContractInfo.balance}
                    <span>Provide rich data about Crypto Market. It's suitable for professional investors.</span>
                </h2>
                <div className={cx('etiquet-price')}>
                    <p>
                        {times.price}TI / {times.quantityTime} {times.type}
                    </p>
                    <div />
                </div>
                <div className={cx('benefits-list')}>
                    <ul>
                        <li>
                            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                            </svg>
                            <span>Shark wallet" Crypto holder</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                            </svg>
                            <span>Shark wallet" Transaction history</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                            </svg>
                            <span>Shark wallet" Detail information</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('button-get-plan')}>
                    {!approve ? (
                        <p onClick={() => handleApprove(premiumPrice.price, handleToggleApprove)}>
                            <span style={{ fontSize: '18px' }}>Approve Token</span>
                        </p>
                    ) : (
                        <p
                            onClick={async () => {
                                await handleUpgradePremium(premiumPrice.price);
                                // setApprove(false);
                            }}
                        >
                            <span style={{ fontSize: '18px' }}>Upgrade Premium</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BuyLevel;
