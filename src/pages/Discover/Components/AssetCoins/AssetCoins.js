import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import ChartOverview from './ChartOverview';
const cx = classNames.bind(styles);

function AssetCoins() {
    return (
        <section className={cx('asset')}>
            <span>Dashboard &gt; Home</span>
            <marquee>
                <ul className={cx('asset-notification')}>
                    <li>
                        <p>Number of shark: <span>1,886</span></p>
                    </li>
                    <li>
                        <p>Total assets: <span>$89,111,896,694</span></p>
                    </li>
                    <li>
                        <p>Total transaction 24h: <span>$89,111,896,694</span></p>
                    </li>
                    <li>
                        <p>Total volumn 24h: <span>$183,376,732</span></p>
                    </li>
                </ul>
            </marquee>
            <div className={cx('asset-content')}>
                <h2>assets</h2>
            </div>
            <div className={cx('asset-coin')}>
                <div className={cx('asset-coin-flex')}>
                    <div className={cx('asset-coin--box')}>
                        <div className={cx('asset-chart--box')}>
                            <div className={cx('asset-dolar')}>
                                <p>$</p>
                                <h4>1,820</h4>
                            </div>
                            <div className={cx('asset-chart')}>
                                <ChartOverview/>
                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Loss</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Netral</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('asset-coin--box')}>
                        <div className={cx('asset-chart--box')}>
                            <div className={cx('asset-dolar')}>
                                <p>$</p>
                                <h4>1,820</h4>
                            </div>
                            <div className={cx('asset-chart')}>
                            <ChartOverview/>

                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Loss</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Netral</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('asset-coin--box')}>
                        <div className={cx('asset-chart--box')}>
                            <div className={cx('asset-dolar')}>
                                <p>$</p>
                                <h4>1,820</h4>
                            </div>
                            <div className={cx('asset-chart')}>
                            <ChartOverview/>

                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Loss</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Netral</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('asset-coin--box')}>
                        <div className={cx('asset-chart--box')}>
                            <div className={cx('asset-dolar')}>
                                <p>$</p>
                                <h4>1,820</h4>
                            </div>
                            <div className={cx('asset-chart')}>
                            <ChartOverview/>

                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Loss</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Netral</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AssetCoins;
