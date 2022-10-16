import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './AssetCoinBox.modules.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { CaretNextIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
function AssetCoinItem({ title, iconBox }) {
    const statusSidebarSelector = useSelector(SidebarSelector);

    const boxClassName = cx('asset-coin--box', {
        'hide-box': !statusSidebarSelector,
    });
    return (
        <div className={boxClassName}>
            <div className={cx('coin-trending')}>
                <div className={cx('coin-trending__box')}>
                    <h4>
                        <img src={iconBox} alt="" />
                        {title}
                    </h4>
                    <div className={cx('coin-trending__box--more-link')}>
                        <h5>More</h5>
                        <CaretNextIcon width={13} height={13} />
                    </div>
                </div>
                <div className={cx('coin-trending__change')}>
                    <div className={cx('coin-trending__info')}>
                        <span className={cx('coin-info_stt')}>1</span>
                        <img
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                            alt=""
                            className={cx('coin-info_icon')}
                            width="16"
                            height="16"
                        />
                        <span className={cx('coin-info_name')}>Bitcoin</span>
                        <span className={cx('coin-info_symbol')}>BTC</span>
                    </div>
                    <p className={cx('coin-trending__percent')}>3.14%</p>
                </div>
                <div className={cx('coin-trending__change')}>
                    <div className={cx('coin-trending__info')}>
                        <span className={cx('coin-info_stt')}>1</span>
                        <img
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                            alt=""
                            className={cx('coin-info_icon')}
                            width="16"
                            height="16"
                        />
                        <span className={cx('coin-info_name')}>Bitcoin</span>
                        <span className={cx('coin-info_symbol')}>BTC</span>
                    </div>
                    <p className={cx('coin-trending__percent')}>3.14%</p>
                </div>
                <div className={cx('coin-trending__change')}>
                    <div className={cx('coin-trending__info')}>
                        <span className={cx('coin-info_stt')}>1</span>
                        <img
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                            alt=""
                            className={cx('coin-info_icon')}
                            width="16"
                            height="16"
                        />
                        <span className={cx('coin-info_name')}>Bitcoin</span>
                        <span className={cx('coin-info_symbol')}>BTC</span>
                    </div>
                    <p className={cx('coin-trending__percent')}>3.14%</p>
                </div>
            </div>
        </div>
    );
}

export default AssetCoinItem;
