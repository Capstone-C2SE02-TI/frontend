
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import ChartOverview from '~/pages/Discover/Components/AssetCoins/ChartOverview';
const cx = classNames.bind(styles);
function AssetCoinItem() {

     const statusSidebarSelector = useSelector(SidebarSelector);

     const boxClassName = cx('asset-coin--box', {
         'hide-box': !statusSidebarSelector,
     });
    return (
        <div className={boxClassName}>
            <div className={cx('asset-chart--box')}>
                <div className={cx('asset-dolar')}>
                    <p>$</p>
                    <h4>1,820</h4>
                </div>
                <div className={cx('asset-chart')}><ChartOverview/></div>
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
    );
}

export default AssetCoinItem;