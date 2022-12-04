import classNames from "classnames/bind";
import styles from './ReferentItem.module.scss'
import numberWithCommas from '~/helpers/numberWithCommas';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ReferentItem({ data }) {

    const navigate = useNavigate();

    return (
        <div className={cx('referent-item')} onClick={() => navigate(`/discover/detail/${data.symbol}`)}>
            <img
                className={cx('referent-item-img')}
                src={data.iconURL || 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'}
                alt={data.name}
            />
            <div className={cx('referent-item-name')}>
                <span>{data.name}</span>
                <p>{data.symbol}</p>
            </div>
            <div className={cx('referent-item-value')}>
                <span>$ {String(data.usd.price)} </span>
                <p>+ {numberWithCommas(data.usd.percentChange24h.toFixed(3))}%</p>
            </div>
        </div>
    );
}

export default ReferentItem;