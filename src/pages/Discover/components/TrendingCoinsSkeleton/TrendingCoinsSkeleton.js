import Skeleton from "react-loading-skeleton";
import classNames from 'classnames/bind';
import styles from './TrendingCoinsSkeleton.module.scss'

const cx = classNames.bind(styles);

function TrendingCoinsSkeleton({card=4}) {
    return (
        <div className={cx('trending-coins-skeleton')}>
            {Array(card).fill(0).map((_, i) => {
                  return <div key={i} className={cx('trending-skeleton-box')}>
                      <div className={cx('trending-skeleton-title')}>
                          <Skeleton circle width={30} height={30} className={cx('trending-skeleton-icon')} />
                          <Skeleton count={1} width={100} />
                      </div>
                      <Skeleton count={1} width={100} className={cx('trending-skeleton-text')} />
                      <Skeleton count={1} width={100} className={cx('trending-skeleton-text')} />
                  </div>;
          }) }
          
        </div>
    );
}

export default TrendingCoinsSkeleton;