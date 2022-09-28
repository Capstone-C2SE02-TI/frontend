import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
const cx = classNames.bind(styles);

function AssetCoins() {
    return (
        <section className={cx('asset')}>
            <span>Dashboard &gt; Home</span>
            <div className={cx('asset-content')}>
                <h2>assets</h2>
                <p>More Assets --&gt; </p>
            </div>
            <div className={cx('asset-coin')}>
                <p>Ethereum</p>
                <div className={cx('asset-coin-flex')}>
                    <div className={cx('asset-coin--box')}>
                        <div className={cx('asset-chart--box')}>
                            <div className={cx('asset-dolar')}>
                                <p>$</p>
                                <h4>1,820</h4>
                            </div>
                            <div className={cx('asset-chart')}>
                                chart
                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
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
                                chart
                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
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
                                chart
                            </div>
                        </div>
                        <div className={cx('asset-gain')}>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
                                <p className={cx('asset-percent')}>+2.87%</p>
                            </div>
                            <div className={cx('asset-gain-box')}>
                                <p>Profit</p>
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
