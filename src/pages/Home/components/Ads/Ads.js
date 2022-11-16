import { Parallax } from 'react-parallax';
import classNames from 'classnames/bind';
import styles from '../../Home.module.scss';
import images from '~/assets/images';
import { faStar, faMagnifyingGlass, faChartSimple, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function Ads() {
    return (
        <div className={cx('container-fluid')}>
            <div className={cx('ads')}>
                <div className={cx('col')}>
                    <h3>3,500+</h3>
                    <p>Each successful investor provides you a unique lesson. SharkScan makes their wide knowledge and experience to be yours.</p>
                </div>
                <div className={cx('col')}>
                    <h3>7,5B USD</h3>
                    <p>is the total asset Sharks holding. Data of various investors owning from 100.000 USD to 50 million USD are collected and analyzed.</p>
                </div>
                <div className={cx('col')}>
                    <h3>5,214+</h3>
                    <p>are the number of Crypto projects Sharks investing in. On-chain analyzing is the wisest and safest method to take part in the Crypto Market.</p>
                </div>
            </div>
            <Parallax className={cx('banner-parallax')} bgImage={images.introduction2} bgImageAlt="the cat" strength={800}>

                <section className={cx('container')}>
                    <div className={cx('ads2')}>
                        <h1>JOIN CRYPTO MARKET WITH CONFIDENCE</h1>
                        <div className={cx('row')}>
                            <div className={cx('col2')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faStar} />
                                <p>Top Worldwide Crypto Investor</p>
                            </div>
                            <div className={cx('col2')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                                <p>Increase Profit Reduce Risk</p>
                            </div>
                            <div className={cx('col2')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChartSimple} />
                                <p>Analysis Onchain Data Find Entry</p>
                            </div>
                            <div className={cx('col2')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChartLine} />
                                <p>Get Signal Never Left Behind</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Parallax>
        </div>
    )
}

export default Ads