import { Col, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './TokenDetail.module.scss';
import ReferentItem from './components/ReferentItem/ReferentItem';
import P2P from '../P2P';
import Slider from 'react-slick';
import WalletHotItem from './components/WalletHotItem';
import { Option } from 'antd/lib/mentions';
import { useEffect, useState } from 'react';
import SkeletonReferent from './components/ReferentItem/SkeletonReferent';

const MARKET_SHOW = 4;

const cx = classNames.bind(styles);
const FILTERS_CHART_DATA = ['Day', 'Month', 'Year'];

function TokenDetail() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const sideEffects = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            clearTimeout(sideEffects);
        };
    }, []);

    const settingsSlider = {
        dots: false,
        infinite: 8 > MARKET_SHOW,
        arrows: false,
        slidesToShow: MARKET_SHOW,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 2000,
        adaptiveHeight: true,
        draggable: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };
    const renderWalletHot = () => {
        return (
            <Slider {...settingsSlider} className={cx('wallet-hot-statics')}>
                <WalletHotItem increaseCoin index={1} />
                <WalletHotItem reduceCoin index={2} />
                <WalletHotItem increaseCoin index={3} />
                <WalletHotItem reduceCoin index={4} />
                <WalletHotItem reduceCoin index={5} />
                <WalletHotItem increaseCoin index={6} />
                <WalletHotItem reduceCoin index={7} />
                <WalletHotItem increaseCoin index={8} />
                <WalletHotItem increaseCoin index={9} />
                <WalletHotItem increaseCoin index={10} />
                <WalletHotItem reduceCoin index={11} />
                <WalletHotItem increaseCoin index={12} />
                <WalletHotItem reduceCoin index={13} />
            </Slider>
        );
    };

    const ReferentWallet = () => {
        return (
            <div className={cx('wallet-referent')}>
                <h3 className={cx('wallet-referent__heading')}>Trending Cryptos</h3>

                {loading ? (
                    <SkeletonReferent card={6} />
                ) : (
                    <>
                        <ReferentItem />
                        <ReferentItem />
                        <ReferentItem />
                        <ReferentItem />
                        <ReferentItem />
                        <ReferentItem />
                    </>
                )}
            </div>
        );
    };

    const handleFilterChart = (time) => {
      
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wallet-top-container')}>{renderWalletHot()}</div>
            <div className={cx('wallet-bottom-container')}>
                <div className={cx('wallet-content-statics')}>
                    <Row>
                        <Col span={17}>
                            <div className={cx('wallet-chart')}>
                                <div style={{ textAlign: 'right', padding: '16px' }}>
                                    <Select
                                        defaultValue={FILTERS_CHART_DATA[0]}
                                        style={{ width: 120 }}
                                        onChange={handleFilterChart}
                                    >
                                        {FILTERS_CHART_DATA.map((time) => (
                                            <Option key={time}>{time}</Option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <P2P />
                                </div>
                            </div>
                        </Col>
                        <Col span={7}>{ReferentWallet()}</Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TokenDetail;
