import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import AssetCoinItem from './AssetCoinsItem';
import AssetCoinsItemLoss from './AssetCoinsItemLoss'
import AssetImage from './AssetImage'
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
                    <AssetCoinItem />
                    <AssetCoinsItemLoss />
                    <AssetImage />
             
                    {!statusSidebarSelector && <AssetCoinItem />}
                </div>
            </div>
        </section>
    );
}

export default AssetCoins;
