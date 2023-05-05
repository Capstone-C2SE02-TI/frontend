import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PortfolioSharkFollow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sharkFollowedSelector, transactionHistorySelector } from '~/modules/SharkFollowed/selector';
import { fetchSharkFollowed, fetchTransactionHistoryPortfolio, removeSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import PortfolioSharkFollowItem from './components/PortfolioSharkFollowItem/PortfolioSharkFollowItem';
import { sharkFollowedSelectedSelector } from '~/modules/Portfolio/selector';
import { saveSharkFollowedSelected } from '~/modules/Portfolio/portfolioSlice';
import ChartTrading from './components/ChartTrading/ChartTrading';
import { userInfoSelector, userIsPremiumSelector } from '~/modules/user/auth/selectors';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { resetSharkDetail } from '~/modules/SharkWallet/sharkWalletSlice';
import Rechart from './components/Rechart/Rechart';

const cx = classNames.bind(styles);

function PortfolioSharkFollow() {
    const dispatch = useDispatch();

    const sharkFolloweds = useSelector(sharkFollowedSelector);
    const userName = JSON.parse(localStorage.getItem('userInfo'));
    const userInfo = useSelector(userInfoSelector);
    const sharkFollowedSelected = useSelector(sharkFollowedSelectedSelector);
    const transactionHistory = useSelector(transactionHistorySelector);
    const ethAddress = localStorage.getItem('eth_address');

    useEffect(() => {
        dispatch(fetchSharkFollowed(ethAddress));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, ethAddress]);

    useEffect(() => {
        if (sharkFolloweds.length > 0) {
            dispatch(saveSharkFollowedSelected(sharkFolloweds[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sharkFolloweds]);
    const userIsPremium = useSelector(userIsPremiumSelector);

    const navigate = useNavigate();


    useEffect(() => {
        if (sharkFollowedSelected.sharkId) {
            dispatch(fetchTransactionHistoryPortfolio(sharkFollowedSelected.sharkId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sharkFollowedSelected]);

    const handleChangeSharkSelelected = (sharkIdSelected) => {
        dispatch(removeSharkFollowed(sharkIdSelected))
        dispatch(resetSharkDetail(''));
    }
    return (
        <div className="portfolio">
            {userIsPremium ? (
                <div>
                    <div>
                        <div className={cx('portfolio-h1')}>
                            <h1>Portfolio</h1>
                        </div>
                        {/* <DoughnutChart classNames={cx('chart-shark')} cryptosSharkWallet={sharkCrypto} /> */}
                        <table className={cx('portfolio-table')}>
                            <thead>
                                <tr>
                                    <th>Shark</th>
                                    <th>Address</th>
                                    <th>Total Assets</th>
                                    <th>24h%</th>
                                    <th>Follow</th>
                                </tr>
                            </thead>

                            <tbody className={cx('portfolio-list-shark')}>
                                {sharkFolloweds
                                    .slice()
                                    .sort((prev, next) => prev.sharkId - next.sharkId)
                                    .map((sharkFollowed, index) => (
                                        <PortfolioSharkFollowItem
                                            onChangeSharkSelelected={handleChangeSharkSelelected}
                                            userId={userName.userId}
                                            key={sharkFollowed.sharkId}
                                            dataSharkFollowed={sharkFollowed}
                                            isActiveDefault={index === 0}
                                        />
                                    ))}
                            </tbody>
                        </table>
                        {sharkFolloweds.length === 0 && <div className="text-center">No data</div>}
                    </div>
                    {transactionHistory.length > 0 && (
                        <ChartTrading
                            dataTransactionHistory={transactionHistory}
                            sharkAddress={sharkFollowedSelected.walletAddress}
                            name={sharkFollowedSelected.sharkId}
                        />
                    )}
                    {/* <div style={{height: '700px'}}>
                        <Rechart />
                    </div> */}
                </div>
            ) : (
                <div className={cx('d-flex flex-column align-items-center')}>
                    <img
                        width="216"
                        src="https://s2.coinmarketcap.com/static/cloud/img/posts/no-post.png?_=b8777e5"
                        alt="nothing-here"
                    />
                    <p style={{ margin: '0px', color: 'rgb(34, 37, 49)', fontSize: '28px', fontWeight: ' 700' }}>
                        Nothing here!
                    </p>
                    <p style={{ color: 'rgb(128, 138, 157)', padding: '12px' }}>
                        You can discover and follow shark accounts that interest you! If you update your premium
                        account!
                    </p>
                    <Button primary onClick={() => navigate('/upgrade')} y>
                        Upgrade premium account
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PortfolioSharkFollow;
