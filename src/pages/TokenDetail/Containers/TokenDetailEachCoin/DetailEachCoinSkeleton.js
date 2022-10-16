import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import styles from './TokenDetailEachCoin.modules.scss';

const cx = classNames.bind(styles);

function DetailEachCoinSkeleton() {
    return (
        <div className={cx('token-container-skeleton')}>
            <div className={cx('token-skeleton-heading')}>
                <Skeleton circle width={50} height={50} />
                <div className={cx('token-skeleton-symbol')}>
                    <Skeleton width={250} className={cx('token-skeleton-')} />
                    <Skeleton width={500} />
                </div>
            </div>

            <Skeleton width={800} height={60} className={cx('skeleton-title-full-width')} />

            <Skeleton width={750}  />
            <Skeleton width={700}  />
            <Skeleton width={500}  />
            <Skeleton width={400}  />
        </div>
    );
}

export default DetailEachCoinSkeleton;
