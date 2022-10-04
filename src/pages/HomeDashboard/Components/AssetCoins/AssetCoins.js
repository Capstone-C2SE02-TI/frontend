import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import AssetCoinItem from './AssetCoinsItem';
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
                    <AssetCoinItem />
                    <AssetCoinItem />
                    <AssetCoinItem />
                   <AssetCoinItem />
                </div>
            </div>
        </section>
    );
}

export default AssetCoins;
