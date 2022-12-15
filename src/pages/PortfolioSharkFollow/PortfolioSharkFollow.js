import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PortfolioSharkFollow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTransactionSelector, sharkFollowedSelector, sharkLoadingSelector, transactionHistorySelector } from '~/modules/SharkFollowed/selector';
import { fetchSharkFollowed, fetchTransactionHistoryPortfolio, removeSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import PortfolioSharkFollowItem from './components/PortfolioSharkFollowItem/PortfolioSharkFollowItem';
import { sharkFollowedSelectedSelector } from '~/modules/Portfolio/selector';
import { saveSharkFollowedSelected } from '~/modules/Portfolio/portfolioSlice';
import ChartTrading from './components/ChartTrading/ChartTrading';
import { useState } from 'react';
import { fetchTransactionHistorySharkWallet, resetSharkDetail } from '~/modules/SharkWallet/sharkWalletSlice';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function PortfolioSharkFollow() {
    const dispatch = useDispatch();

    const sharkFolloweds = useSelector(sharkFollowedSelector);
    const userName = JSON.parse(localStorage.getItem('userInfo'));

    const sharkFollowedSelected = useSelector(sharkFollowedSelectedSelector);
    const transactionHistory = useSelector(transactionHistorySelector);
    const loadingShark = useSelector(sharkLoadingSelector);
    const loadingTransaction = useSelector(loadingTransactionSelector);
    console.log({ transactionHistory });

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
                            <th>24h%</th>
                            <th>Follow</th>
                        </tr>
                    </thead>

                    <tbody className={cx('portfolio-list-shark')}>
                        {sharkFolloweds
                            .slice()
                            .sort((prev, next) => prev.sharkId - next.sharkId)
                            .map((sharkFollowed) => (
                                <PortfolioSharkFollowItem
                                    onChangeSharkSelelected={handleChangeSharkSelelected}
                                    userId={userName.userId}
                                    key={sharkFollowed.sharkId}
                                    dataSharkFollowed={sharkFollowed}
                                />
                            ))}
                    </tbody>
                </table>
                {/* {sharkFolloweds.length === 0 && <div className="text-center"></div>} */}
                <Loading loading={loadingShark === 'loading' ? true : false} />
            </div>
            <Loading loading={loadingTransaction === 'loading' ? true : false} />

            {transactionHistory.length > 0 && (
                <ChartTrading
                    dataTransactionHistory={transactionHistory}
                    sharkAddress={sharkFollowedSelected.walletAddress}
                    name={sharkFollowedSelected.sharkId}
                />
            )}
        </div>
    );
}

export default PortfolioSharkFollow;
