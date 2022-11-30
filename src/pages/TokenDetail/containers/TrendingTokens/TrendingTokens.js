

import classNames from 'classnames/bind';
import styles from '../../TokenDetail.module.scss';
import SkeletonReferent from '../../components/ReferentItem/SkeletonReferent';
import ReferentItem from '../../components/ReferentItem';

const cx = classNames.bind(styles);

function TrendingTokens({data}) {
 
    return (
        <div className={cx('wallet-referent')}>
            <h3 className={cx('wallet-referent__heading')}>Trending Tokens</h3>

            { data.length !== 0 ? (
                <>
                    {data.map((token, i) => <ReferentItem key={i} data = {token} />)}
                </>
            ) : (
                <SkeletonReferent card={10} />
            )}
        </div>
    );
}

export default TrendingTokens;
