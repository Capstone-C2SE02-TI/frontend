import { stringToNumber } from '@syncfusion/ej2-react-charts';
import classNames from 'classnames/bind';
import numberWithCommas from '~/helpers/numberWithCommas';
import { ArrowDown, ArrowUp } from '~/components/Icons';
import styles from './WalletHotItem.module.scss';
const cx = classNames.bind(styles);

function WalletHotItem({ data, increaseCoin = false, reduceCoin = false, index }) {
    const classNamesStatusCoin = cx({
        increase: increaseCoin,
        reduce: reduceCoin,
    });
    return (
        <div className={cx('wallet-statics__card')}>
            <span className={cx('wallet-statics__card__heading')}>
                <div className={cx('wallet-statics__card__heading__item')}>
                    <img src={data.iconURL} alt="logo" />
                    {`${data.name}`}
                </div>
                <div className={cx('wallet-statics__card__heading__statics-values')}>
                    {increaseCoin && <ArrowUp />}
                    {reduceCoin && <ArrowDown />}
                    <p className={classNamesStatusCoin}>{data.usd.percentChange24h.toFixed(3)}%</p>
                </div>
            </span>
            <h3 className={cx('wallet-statics__card__values')}>{String(data.usd.price)}$</h3>
            <span className={cx('wallet-statics__card__date')}><p>Total Supply:</p> {numberWithCommas(data.circulatingSupply)}$</span>
        </div>
    );
}

export default WalletHotItem;
