import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import AssetCoinBox from '../../components/AssetCoinBox';
import { useDispatch, useSelector } from 'react-redux';
import { trendingCoinsSelector } from '~/modules/Discover/selector';
import { fetchCoinsAndTokensLoss } from '~/modules/HomeDashboard/homeDashboardSlice';
import { useEffect } from 'react';
import { coinsAndTokensLossSelector } from '~/modules/HomeDashboard/selector';
import Slider from 'react-slick';
import WrapperBox from '../../components/WrapperBox/WrapperBox';

const cx = classNames.bind(styles);

const DISPLAY_COIN_TRENDING = 3;
const MARKET_SHOW = 1;

function AssetCoins() {
    const dispatch = useDispatch();

    const trendingCoins = useSelector(trendingCoinsSelector);
    const coinsAndTokensLoss = useSelector(coinsAndTokensLossSelector);

    useEffect(() => {
        dispatch(fetchCoinsAndTokensLoss());
    }, [dispatch]);

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
        autoplaySpeed: 2222000,
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

    return (
        <section className={cx('asset')}>
            <span>Dashboard &gt; Home</span>
            <div className={cx('asset-content')}>
                <h2>assets</h2>
            </div>
            <div className={cx('asset-coin')}>
                <div className={cx('asset-coin-flex')}>
                    <WrapperBox>
                        <AssetCoinBox
                            type="trending"
                            data={trendingCoins.slice(0, DISPLAY_COIN_TRENDING)}
                            title="Trending Coins"
                            iconBox="https://s2.coinmarketcap.com/static/cloud/img/TrendingIcon.png?_=1e65079"
                        />
                    </WrapperBox>
                    <WrapperBox>
                        <AssetCoinBox
                            type="loss"
                            data={coinsAndTokensLoss.slice(0, DISPLAY_COIN_TRENDING)}
                            title="Loss Tokens and Coins"
                            iconBox="https://s2.coinmarketcap.com/static/cloud/img/AddIcon.png?_=1e65079"
                        />
                    </WrapperBox>
                    <WrapperBox>
                        <AssetCoinBox
                            type="trending"
                            data={trendingCoins.slice(0, DISPLAY_COIN_TRENDING)}
                            title="Trending Coins"
                            iconBox="https://s2.coinmarketcap.com/static/cloud/img/TrendingIcon.png?_=1e65079"
                        />
                    </WrapperBox>
                    {/* <WrapperBox>
                        <div>
                            <Slider {...settingsSlider}>
                                <AssetCoinBox
                                    type="loss"
                                    data={coinsAndTokensLoss.slice(0, DISPLAY_COIN_TRENDING)}
                                    title="Loss Tokens and Coins"
                                    iconBox="https://s2.coinmarketcap.com/static/cloud/img/AddIcon.png?_=1e65079"
                                />
                            </Slider>
                        </div>
                    </WrapperBox> */}
                </div>
            </div>
        </section>
    );
}

export default AssetCoins;
