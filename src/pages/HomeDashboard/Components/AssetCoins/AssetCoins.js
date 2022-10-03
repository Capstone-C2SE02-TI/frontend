import classNames from 'classnames/bind';
import styles from './AssetCoin.module.scss';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import AssetCoinItem from './AssetCoinsItem';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
const cx = classNames.bind(styles);
const MARKET_SHOW = 3;

function AssetCoins() {
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
 const statusSidebarSelector = useSelector(SidebarSelector);

    return (
        <section className={cx('asset')}>
            <span>Dashboard &gt; Home</span>
            <div className={cx('asset-content')}>
                <h2>assets</h2>
                <p>More Assets --&gt; </p>
            </div>
            <div className={cx('asset-coin')}>
                <p>Ethereum</p>
                <div className={cx('asset-coin-flex')}>
                    <AssetCoinItem />
                    <AssetCoinItem />
                    <AssetCoinItem />
             
                    {!statusSidebarSelector && <AssetCoinItem />}
                </div>
            </div>
        </section>
    );
}

export default AssetCoins;
