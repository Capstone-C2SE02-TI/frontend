import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Ads() {
    return (
        <section className={cx('container')}>
            <div className={cx('ads')}>
                <div className={cx('col')}>
                    <h3>3,500+</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas aliquid nesciunt aliquam sunt! Eos temporibus accusantium earum unde rem possimus quas molestias ea tempora adipisci, molestiae in atque iusto maiores.</p>
                </div>
                <div className={cx('col')}>
                    <h3>3,500+</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas aliquid nesciunt aliquam sunt! Eos temporibus accusantium earum unde rem possimus quas molestias ea tempora adipisci, molestiae in atque iusto maiores.</p>
                </div>
                <div className={cx('col')}>
                    <h3>3,500+</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas aliquid nesciunt aliquam sunt! Eos temporibus accusantium earum unde rem possimus quas molestias ea tempora adipisci, molestiae in atque iusto maiores.</p>
                </div>
            </div>
            <div className={cx('ads2')}>
                <h1>JOIN CRYPTO MARKET WITH CONFIDENCE</h1>
                <div className={cx('row')}>
                    <div className={cx('col2')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faStar} />
                        <p>Top Worldwide Crypto Investor</p>
                    </div>
                    <div className={cx('col2')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faStar} />
                        <p>Top Worldwide Crypto Investor</p>
                    </div>
                    <div className={cx('col2')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faStar} />
                        <p>Top Worldwide Crypto Investor</p>
                    </div>
                    <div className={cx('col2')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faStar} />
                        <p>Top Worldwide Crypto Investor</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Ads