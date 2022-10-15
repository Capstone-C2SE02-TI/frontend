
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

            </div>
        </div>
    );
}

export default AssetCoinItem;