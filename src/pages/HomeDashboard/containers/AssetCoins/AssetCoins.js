import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import AssetCoinBox from '../../components/AssetCoinBox';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function AssetCoins() {
    const statusSidebarSelector = useSelector(SidebarSelector);

    return (
        <section className={cx('asset')}>
            <span>Dashboard &gt; Home</span>
            <div className={cx('asset-content')}>
                <h2>assets</h2>
            </div>
            <div className={cx('asset-coin')}>
                <div className={cx('asset-coin-flex')}>
                    <AssetCoinBox
                        title="Trending"
                        iconBox="https://s2.coinmarketcap.com/static/cloud/img/TrendingIcon.png?_=1e65079"
                    />
                    <AssetCoinBox
                        title="Recently Added"
                        iconBox="https://s2.coinmarketcap.com/static/cloud/img/AddIcon.png?_=1e65079"
                    />
                    <AssetCoinBox
                        title="Recently Added"
                        iconBox="https://s2.coinmarketcap.com/static/cloud/img/AddIcon.png?_=1e65079"
                    />

                    {!statusSidebarSelector && <AssetCoinBox />}
                </div>
            </div>
        </section>
    );
}

export default AssetCoins;
