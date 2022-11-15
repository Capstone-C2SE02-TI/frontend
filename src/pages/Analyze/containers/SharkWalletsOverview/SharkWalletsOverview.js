
import { useEffect, useState } from 'react';
import { Slider } from 'antd';
import millify from 'millify';
import classNames from 'classnames/bind';

import styles from './SharkWalletsOverview.module.scss';
import SharkWalletsOverviewItem from '../../components/SharkWalletsOverviewItem/';
import { useSelector, useDispatch } from 'react-redux';
import { filterSharkTotalAssetsSelector, sharkCryptoStatusSelector, sharkListSelector, sharkRemainingSelector } from '~/modules/SharkWallet/selector';
import sharkWalletSlice, { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import NoData from '~/components/NoData';

const cx = classNames.bind(styles);

const DOLLAR = 10000000;

function SharkWalletsOverview() {
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(50 * DOLLAR);

    const dispatch = useDispatch();
    const sharksCoin = useSelector(sharkRemainingSelector);
    const status = useSelector(sharkCryptoStatusSelector);

    useEffect(() => {
        dispatch(fetchSharkWallet());
    }, [dispatch]);

    useEffect(() => {

        console.log({ sharksCoin });
        if (sharksCoin.length > 0) {
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletId(sharksCoin[0].id));
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletAddress(sharksCoin[0].walletAddress));
            dispatch(sharkWalletSlice.actions.actionSelectedSharkWalletTotalAssets(sharksCoin[0].totalAsset));
            dispatch(sharkWalletSlice.actions.actionSharkInfo(sharksCoin[0]));
        }
        else {
            dispatch(sharkWalletSlice.actions.actionSharkNoData(sharksCoin));

        }
    }, [sharksCoin]);

    const onChange = (value) => {
        setRangeStart(value[0] * DOLLAR);
        setRangeEnd(value[1] * DOLLAR);
    };

    const onAfterChange = (value) => {
        dispatch(
            sharkWalletSlice.actions.actionFilterSharkTotalAssets({
                startTotalAssets: value[0] * DOLLAR,
                endTotalAssets: value[1] * DOLLAR,
            }),
        );
    };

    const formatter = (value) => `$${millify(value * DOLLAR)}`;
    return (
        <div className={cx('shark-overview')}>
            <div className={cx('shark-search')}>
                <div className={cx('shark-range-filter')}>
                    <div className="d-flex justify-content-between mb-8">
                        <div className={cx('shark-filter-range-container')}>
                            <p className={cx('range-dollar')}>$</p>
                            <p className={cx('range-price')}>Price Range</p>
                        </div>
                        <div className={cx('shark-filter-range-container')}>
                            <p className={cx('range-start')}>
                                ${' '}
                                {millify(rangeStart, {
                                    precision: 3,
                                })}
                            </p>
                            <p className={cx('range-spread')}>-</p>
                            <p className={cx('range-end')}>
                                ${' '}
                                {millify(rangeEnd, {
                                    precision: 3,
                                })}
                            </p>
                        </div>
                    </div>
                    <Slider
                        range
                        // step={10}
                        defaultValue={[0, 50]}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
                        tooltip={{ formatter: formatter }}
                    />
                    <p className={cx('current-average')}>
                        Average: ${' '}
                        {millify(rangeStart + rangeEnd / 2, {
                            precision: 3,
                        })}
                    </p>
                </div>
            </div>
            <table className={cx('table-shark')}>
                <thead>
                    <tr>
                        <th>Shark</th>
                        <th>Total assets</th>
                        <th>24%</th>
                        <th>Follow</th>
                    </tr>
                </thead>
                <tbody>
                    {sharksCoin
                        .filter((shark) => shark.totalAssets)
                        .map((sharkCoin) => (
                            <SharkWalletsOverviewItem data={sharkCoin} key={sharkCoin.id} />
                        ))}
                </tbody>
            </table>
            {status !== 'loading' && sharksCoin.length === 0 && <NoData />}
        </div>
    );
}

export default SharkWalletsOverview;
