
import classNames from 'classnames/bind';
import styles from './WalletHotItem.modules.scss';
import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

function WalletHotSkeleton({card}) {
    return Array(card)
        .fill(0)
        .map((_, i) => (
        <div className={cx('wallet-statics__card')}>
            <span className={cx('wallet-statics__card__heading')}>
                <div className={cx('wallet-statics__card__heading__item')}>
                    <Skeleton circle width={40} height={40} />
                </div>
                <div className={cx('wallet-statics__card__heading__statics-values')}>
                    <Skeleton count={1} width={100} />
                </div>
            </span>
            <h3 className={cx('wallet-statics__card__values')}>
              
                <Skeleton count={1} width={100} />
            </h3>
            <span className={cx('wallet-statics__card__date')}>
               
                <Skeleton count={1} width={100} />
            </span>
        </div>
    ));
}

export default WalletHotSkeleton;