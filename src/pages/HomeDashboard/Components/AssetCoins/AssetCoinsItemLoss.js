
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
const cx = classNames.bind(styles);
function AssetCoinItem() {

     const statusSidebarSelector = useSelector(SidebarSelector);

     const boxClassName = cx('asset-coin--box', {
         'hide-box': !statusSidebarSelector,
     });
    return (
        <div className={boxClassName}>
            <div className={cx('coin-trending')}>
                <div className={cx('coin-trending__box')}>
                    <h4>Coin loss</h4>
                    <p>More &gt;</p>
                </div>
                <div className={cx('coin-trending__change')}>
                    <div className={cx('coin-trending__name')}>
                        <p>icon</p>
                        <p>Bitcoin</p>
                        <p>BTC</p>
                    </div>
                    <p className={cx('coin-loss__percent')}>3.14%</p>
                </div>
                <div className={cx('coin-trending__change')}>
                    <div className={cx('coin-trending__name')}>
                        <p>icon</p>
                        <p>Bitcoin</p>
                        <p>BTC</p>
                    </div>
                    <p className={cx('coin-loss__percent')}>3.14%</p>
                </div>
                <div className={cx('coin-trending__change')}>
                    <div className={cx('coin-trending__name')}>
                        <p>icon</p>
                        <p>Bitcoin</p>
                        <p>BTC</p>
                    </div>
                    <p className={cx('coin-loss__percent')}>3.14%</p>
                </div>
            </div>
        </div>
    );
}

export default AssetCoinItem;