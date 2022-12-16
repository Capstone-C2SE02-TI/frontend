import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PortfolioSharkFollow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sharkFollowedSelector } from '~/modules/SharkFollowed/selector';
import { fetchSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import PortfolioSharkFollowItem from './components/PortfolioSharkFollowItem/PortfolioSharkFollowItem';
import { sharkFollowedSelectedSelector } from '~/modules/Portfolio/selector';
import { saveSharkFollowedSelected } from '~/modules/Portfolio/portfolioSlice';
import ChartTrading from './components/ChartTrading/ChartTrading';
import { userIsPremiumSelector } from '~/modules/user/auth/selectors';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PortfolioSharkFollow() {
    const dispatch = useDispatch();
    const sharkFolloweds = useSelector(sharkFollowedSelector);
    const userName = JSON.parse(localStorage.getItem('userInfo'));

    const sharkFollowedSelected = useSelector(sharkFollowedSelectedSelector);

    useEffect(() => {
        dispatch(fetchSharkFollowed(userName.userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (sharkFolloweds.length > 0) {
            dispatch(saveSharkFollowedSelected(sharkFolloweds[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sharkFolloweds]);
    const userIsPremium = useSelector(userIsPremiumSelector);

    const navigate = useNavigate();

    return (
        <div className="portfolio">
            {userIsPremium ? (
                <div>
                    <div>
                        <div className={cx('portfolio-h1')}>
                            <h1>Portfolio: {userName.username ? userName.username : 'No data'}</h1>
                        </div>
                        {/* <DoughnutChart classNames={cx('chart-shark')} cryptosSharkWallet={sharkCrypto} /> */}
                        <table className={cx('portfolio-table')}>
                            <thead>
                                <tr>
                                    <th>Shark</th>
                                    <th>Address</th>
                                    <th>Total Assets</th>
                                    <th>Total Transaction</th>
                                    <th>24h%</th>
                                    <th>Actual Growth</th>
                                    <th>Follow</th>
                                </tr>
                            </thead>

                            <tbody className={cx('portfolio-list-shark')}>
                                {sharkFolloweds
                                    .slice()
                                    .sort((prev, next) => prev.sharkId - next.sharkId)
                                    .map((sharkFollowed) => (
                                        <PortfolioSharkFollowItem
                                            userId={userName.userId}
                                            key={sharkFollowed.sharkId}
                                            dataSharkFollowed={sharkFollowed}
                                        />
                                    ))}
                            </tbody>
                        </table>
                        {sharkFolloweds.length === 0 && <div className="text-center">No data</div>}
                    </div>
                    {sharkFollowedSelected.transactionsHistory && (
                        <ChartTrading
                            dataTransactionHistory={sharkFollowedSelected.transactionsHistory}
                            sharkAddress={sharkFollowedSelected.walletAddress}
                            name={sharkFollowedSelected.sharkId}
                        />
                    )}
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
                    <p style={{ color: 'rgb(128, 138, 157)', padding: "12px" }}>
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
