import classNames from "classnames/bind";
import styles from './ReferentItem.modules.scss'

const cx = classNames.bind(styles);

function ReferentItem({data}) {
    return (
        <div className={cx('referent-item')}>
            <img
                className={cx('referent-item-img')}
                src={data.iconURL || 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'  }
                alt={data.name}
            />
            <div className={cx('referent-item-name')}>
                <span>{data.name}</span>
                <p>{data.symbol}</p>
            </div>
            <div className={cx('referent-item-value')}>
                <span>$ {data.price.toFixed(5)} </span>
                <p>+ {data.percentChange24h.toFixed(3)}%</p>
            </div>
        </div>
    );
}

export default ReferentItem;