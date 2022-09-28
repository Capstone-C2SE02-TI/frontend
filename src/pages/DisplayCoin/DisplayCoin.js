/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './DisplayCoin.module.scss';
import MarketOverview from './components/MarketOverview/MarketOverview';
import SideBar from '~/layouts/LayoutDefault/components/SideBar';
const cx = classNames.bind(styles);

function DisplayCoin() {

    return (
        <section className={cx('container-fluid')}>
            <SideBar/>
            <MarketOverview/>
        </section>
    )
}

export default DisplayCoin;
