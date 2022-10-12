
import classNames from 'classnames/bind';
import styles from './TokenDetail.module.scss';
const cx = classNames.bind(styles);

function TokenDetailEachCoin ()  {
    return (
        <section className={cx('token-container')}>
            <span>Rank #1</span>
            <div className={cx('token-content__name')}>
                <p>Anh</p>
                <h3>Bitcoin (BTC)</h3>
            </div>
            <div className={cx('token-content__price')}>
                <div className={cx('token-price__box')}>
                    <h1>$20,210.45</h1>
                    <span>10.0%</span>
                </div>
                <div className={cx('token-price__inf')}>
                    <h1>Information</h1>
                </div>
            </div>
            <div className={cx('token-content__inf')}>
                <nav>
                    <ul>
                        <li><p>Market Cap</p><p>$387,503,617,100</p></li>
                        <li><p>24 hours trading vol</p><p>$387,503,617,100</p></li>
                        <li><p>Fully Diluted Valuation</p><p>$387,503,617,100</p></li>
                        <li><p>24h low</p><p>$387,503,617,100</p></li>
                        <li><p>All-Time Low</p><p>$387,503,617,100</p></li>
                    </ul>
                    <ul>
                        <li><p>Circulating Supply</p><p>$387,503,617,100</p></li>
                        <li><p>Total Supply</p><p>$387,503,617,100</p></li>
                        <li><p>Max Supply</p><p>$387,503,617,100</p></li>
                        <li><p>24h high</p><p>$387,503,617,100</p></li>
                        <li><p>All-Time High</p><p>$387,503,617,100</p></li>
                    </ul>
                    <ul>
                        <li><p>Contract</p><p>$387,503,617,100</p></li>
                        <li><p>Website</p><p>$387,503,617,100</p></li>
                        <li><p>Explorers</p><p>$387,503,617,100</p></li>
                        <li><p>Community</p><p>$387,503,617,100</p></li>
                        <li><p>Total investment</p><p>$387,503,617,100</p></li>
                    </ul>
                </nav>
               
            </div>
        </section>
    );
}

export default TokenDetailEachCoin;
