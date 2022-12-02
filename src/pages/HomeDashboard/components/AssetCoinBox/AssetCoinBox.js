import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './AssetCoinBox.module.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { CaretNextIcon } from '~/components/Icons';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';
const cx = classNames.bind(styles);
function AssetCoinItem({ title, iconBox, data, type }) {
    const statusSidebarSelector = useSelector(SidebarSelector);

    const boxClassName = cx('asset-coin--box', {
        'hide-box': !statusSidebarSelector,
    });
    const priceValueChange24ClassName = cx('coin-asset__percent', type === 'trending' ? 'trending-coin' : 'loss-coin');
    console.log(data);
    return (
        <div className={boxClassName}>
            <div className={cx('coin-asset')}>
                <div className={cx('coin-asset__box')}>
                    <h4>
                        <img src={iconBox} alt="" />
                        {title}
                    </h4>
                    <div className={cx('coin-asset__box--more-link')}>
                        <h5><a href='/gain-loss'>More</a></h5>
                        <CaretNextIcon width={13} height={13} />
                    </div>
                </div>
                {data.length > 0
                    ? data.map((coin, i) => {
                        return (
                            <div key={i} className={cx('coin-asset__change')}>
                                <div className={cx('coin-asset__info')}>
                                    <span className={cx('coin-info_stt')}>{i + 1}</span>
                                    <img
                                        src={coin.iconURL}
                                        alt=""
                                        className={cx('coin-info_icon')}
                                        width="16"
                                        height="16"
                                    />
                                    <span className={cx('coin-info_name')}>{coin.name}</span>
                                    <span className={cx('coin-info_symbol')}>{coin.symbol}</span>
                                </div>
                                <div className={cx('d-flex justify-content-around align-items-center')}>
                                    {type === 'trending' ? (
                                        <FontAwesomeIcon icon={faCaretUp} className={cx('icon-caret-up')} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCaretDown} className={cx('icon-caret-down')} />
                                    )}
                                    <p className={priceValueChange24ClassName}>
                                        {coin.usd.percentChange24h.toFixed(3)}%
                                    </p>
                                </div>
                            </div>
                        );
                    })
                    : Array(3)
                        .fill(0)
                        .map((_, i) => {
                            return <Skeleton key={i} className={cx('item-coin-box-skeleton')} />;
                        })}
            </div>
        </div>

    );
}

export default AssetCoinItem;
