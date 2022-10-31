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
import { CaretNextIcon } from '~/components/Icons';

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
                            title="Lose big on cryptocurrency"
                            iconBox="https://s2.coinmarketcap.com/static/cloud/img/AddIcon.png?_=1e65079"
                        />
                    </WrapperBox>
                    <WrapperBox>
                        <div className={cx('coin-asset-news')}>
                            <div className={cx('coin-asset__news-heading')}>
                                <h4>
                                    <span className="mr-8">⭐️</span>
                                    Top posting on the community
                                </h4>
                                <div className={cx('coin-asset__box--more-link')}>
                                    <h5>More</h5>
                                    <CaretNextIcon width={13} height={13} />
                                </div>
                            </div>
                            <a
                                className={cx('coin-asset__news-body')}
                                href="https://coinmarketcap.com/community/articles/40260"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <img
                                    width={90}
                                    height={90}
                                    src="https://academy-public.coinmarketcap.com/srd-optimized-uploads/c98156d2624d4ceab56fc67d858528bd.jpg"
                                    alt="What is an NFT – Non-Fungible Token Explained"
                                />
                                <div className="d-flex flex-column ml-8" style={{ padding: '0 16px' }}>
                                    <div>
                                        <img
                                            className="mr-8"
                                            width={23}
                                            height={23}
                                            alt=""
                                            src="https://s3.coinmarketcap.com/static/img/portraits/61359449293ccc2c4bcf07c7.png"
                                        />
                                        <span className={cx('news-title')}>TodayNFTNews</span>
                                    </div>
                                    <p className={cx('news-desc')}>What is an NFT – Non-Fungible Token Explained</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span>Oct 18 . </span>
                                        <svg
                                            width={20}
                                            height={14}
                                            viewBox="0 0 20 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.3333 8.93492C11.4378 8.93492 12.3333 8.06863 12.3333 7.00002C12.3333 5.9314 11.4378 5.06511 10.3333 5.06511C9.22869 5.06511 8.33326 5.9314 8.33326 7.00002C8.33326 8.06863 9.22869 8.93492 10.3333 8.93492Z"
                                                fill="#A6B0C3"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.791016 7.00005C2.06527 3.07497 5.85557 0.227844 10.3332 0.227844C14.8109 0.227844 18.6011 3.07494 19.8754 6.99998C18.6012 10.9251 14.8109 13.7722 10.3332 13.7722C5.85557 13.7722 2.06529 10.9251 0.791016 7.00005ZM14.3333 7.00002C14.3333 9.13725 12.5424 10.8698 10.3333 10.8698C8.12412 10.8698 6.33326 9.13725 6.33326 7.00002C6.33326 4.86278 8.12412 3.1302 10.3333 3.1302C12.5424 3.1302 14.3333 4.86278 14.3333 7.00002Z"
                                                fill="#A6B0C3"
                                            />
                                        </svg>
                                        <span>213 . </span>
                                        <svg
                                            width={15}
                                            height={13}
                                            viewBox="0 0 15 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.57201 1.73851C0.253991 3.05653 0.253991 5.19347 1.57201 6.51149L7.33354 12.273L13.095 6.51149C14.413 5.19347 14.413 3.05653 13.095 1.73851C11.777 0.420495 9.64003 0.420495 8.32201 1.73852L7.33354 2.72707L6.34498 1.73851C5.02696 0.420495 2.89003 0.420495 1.57201 1.73851Z"
                                                fill="#A6B0C3"
                                            />
                                        </svg>
                                        <div className={cx('news-coins-related')}>
                                            <img
                                                src="https://s2.coinmarketcap.com/static/img/coins/64x64/6650.png"
                                                height={16}
                                                width={16}
                                                alt="NFT"
                                            />
                                            <span>NFT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
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
