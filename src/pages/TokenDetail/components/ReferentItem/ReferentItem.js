import classNames from "classnames/bind";
import styles from './ReferentItem.modules.scss'

const cx = classNames.bind(styles);

function ReferentItem() {
    return (
        <div className={cx('referent-item')}>
            <img className={cx('referent-item-img')} src="https://s2.coinmarketcap.com/static/img/coins/128x128/1.png"  alt=""/>
            <div className={cx('referent-item-name')}>
                <span>Bitcoin</span>
                <p>BTC</p>
            </div>
            <div className={cx('referent-item-value')}>
                <span>$ 18,978.56</span>
                <p>+ 2,87%</p>
            </div>
        </div>
    );
}

export default ReferentItem;