import classNames from 'classnames/bind';
import { ArrowDown, ArrowUp } from '~/components/Icons';
import styles from './WalletHotItem.modules.scss';
const cx = classNames.bind(styles);

function WalletHotItem({ increaseCoin = false, reduceCoin = false, index  }) {
    const classNamesStatusCoin = cx({
        increase: increaseCoin,
        reduce: reduceCoin,
    });

    return (
        <div className={cx('wallet-statics__card')}>
            <span className={cx('wallet-statics__card__heading')}>
                Price Change ({index}h)
                <div className={cx('wallet-statics__card__heading__statics-values')}>
                    {increaseCoin && <ArrowUp />}
                    {reduceCoin && <ArrowDown />}
                    <p className={classNamesStatusCoin}>10.0%</p>
                </div>
            </span>
            <h3 className={cx('wallet-statics__card__values')}>$$2,914.45</h3>
            <span className={cx('wallet-statics__card__date')}>Wed, May 20</span>
        </div>
    );
}

export default WalletHotItem;
