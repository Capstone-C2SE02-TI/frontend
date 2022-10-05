import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import styles from './ReferentItem.modules.scss';

const cx = classNames.bind(styles);

function SkeletonReferent({ card }) {
    return Array(card)
        .fill(0)
        .map((_, i) => (
            <div key={i} className={cx('card-skeleton-item')}>
                <div className={cx('card-skeleton-img')}>
                    <Skeleton circle width={40} height={40} />
                </div>
                <div className={cx('card-skeleton-text')}>
                    <Skeleton count={1} width={100} />
                    <Skeleton count={1} width={70} />
                </div>
                <div className={cx('card-skeleton-text')}>
                    <Skeleton count={1} width={100} />
                    <Skeleton count={1} width={80} />
                </div>
            </div>
        ));
}

export default SkeletonReferent;
