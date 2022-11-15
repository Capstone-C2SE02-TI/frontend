import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Analyze.module.scss';
import { Row, Col, Slider } from 'antd';
import SharkWalletsOverview from './containers/SharkWalletsOverview';
import SharkWalletsDetail from './containers/SharkWalletsDetail';
import { useSelector, useDispatch } from 'react-redux';
import { sharkListSelector } from '~/modules/SharkWallet/selector';
import sharkWalletSlice, { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';

import millify from 'millify';
const DOLLAR = 10000000;

const cx = classNames.bind(styles);
function Analyze() {
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(100 * DOLLAR);
    const dispatch = useDispatch();

    const onChange = (value) => {
        setRangeStart(value[0] * DOLLAR);
        setRangeEnd(value[1] * DOLLAR);
    };

    useEffect(() => {
        console.log(rangeStart);
        console.log(rangeEnd);
        dispatch(
            sharkWalletSlice.actions.actionFilterSharkTotalAssets({
                startTotalAssets: rangeStart,
                endTotalAssets: rangeEnd,
            }),
        );
    },[])

    const onAfterChange = (value) => {
        dispatch(
            sharkWalletSlice.actions.actionFilterSharkTotalAssets({
                startTotalAssets: value[0] * DOLLAR,
                endTotalAssets: value[1] * DOLLAR,
            }),
        );
    };

    const formatter = (value) => `$ ${millify(value * DOLLAR)}`;

    const renderFilterRange = () => {
        return (
            <div className={cx('shark-range-filter')}>
                <div className="d-flex justify-content-between mb-8">
                    <div className={cx('shark-filter-range-container')}>
                        <p className={cx('range-price')}>
                            {' '}
                            Average: ${' '}
                            {millify((rangeStart + rangeEnd) / 2, {
                                precision: 3,
                            })}
                        </p>
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
                    defaultValue={[0, 100]}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                    tooltip={{ formatter: formatter }}
                />
            </div>
        );
    }

    return (
        <section className={cx('shark-wallet')}>
            <div className={cx('shark-wallet__content')}>
                <h2>SHARK WALLETS</h2>
                {renderFilterRange()}
            </div>
            <Row>
                <Col span={8}>
                    <SharkWalletsOverview />
                </Col>
                <Col span={15}>
                    <SharkWalletsDetail />
                </Col>
            </Row>
        </section>
    );
}

export default Analyze;
