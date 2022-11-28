import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PortfolioSharkFollow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sharkFollowedSelector } from '~/modules/SharkFollowed/selector';
import { fetchSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import PortfolioSharkFollowItem from './components/PortfolioSharkFollowItem/PortfolioSharkFollowItem';

const cx = classNames.bind(styles);


function PortfolioSharkFollow() {
    const dispatch = useDispatch();
    const sharkFollowed = useSelector(sharkFollowedSelector);
    const userName = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        dispatch(fetchSharkFollowed(userName.userId));
    }, [dispatch]);

    console.log('sharkFollowed', sharkFollowed)

    return (
        <div className='portfolio'>
            <div>
                <div className={cx('portfolio-h1')}>
                    <h1>Portfolio: {userName.username ? userName.username : 'No data'}</h1>
                </div>
                {/* <DoughnutChart classNames={cx('chart-shark')} cryptosSharkWallet={sharkCrypto} /> */}
                <table>
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
                        {sharkFollowed.length === 0 && <div className="text-center">No data</div>}
                        {sharkFollowed.map((sharkFollowed, index) => (
                            <PortfolioSharkFollowItem
                                index={index}
                                key={index}
                                dataSharkFollowed={sharkFollowed}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
}

export default PortfolioSharkFollow;
