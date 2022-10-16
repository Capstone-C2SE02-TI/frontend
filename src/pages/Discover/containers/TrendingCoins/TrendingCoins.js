import Slider from 'react-slick';
import WalletHotItem from '../../components/WalletHotItem';
import classNames from 'classnames/bind';
import styles from './TrendingCoins.module.scss';

import { memo } from 'react';
// import  Skeleton  from 'react-loading-skeleton';

const MARKET_SHOW = 4;
const cx = classNames.bind(styles);

function TrendingCoins({ data, loading }) {

  
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
        autoplaySpeed: 3000,
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

    return data.length > 0 && loading === 'idle' && (
        <Slider {...settingsSlider} className={cx('wallet-hot-statics')}>
            {data.map((coin) => {
                return (
                    <WalletHotItem
                        key={coin.id}
                        increaseCoin={coin.usd.percentChange24h > 0 ? true : false}
                        reduceCoin = {coin.usd.percentChange24h > 0 ? false : true}
                        index={1}
                        data={coin}
                    />
                );
            })}
        </Slider>
    ) 
  
}

export default memo(TrendingCoins);
