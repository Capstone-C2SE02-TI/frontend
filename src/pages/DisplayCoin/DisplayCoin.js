/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './DisplayCoin.module.scss';
import NavLeft from './components/NavLeft/NavLeft';
import HeaderCommon from './components/HeaderCommon/HeaderCommon';
import MarketOverview from './components/MarketOverview/MarketOverview';
const cx = classNames.bind(styles);

function DisplayCoin() {

    return (
        <section className={cx('container-fluid')}>
            <NavLeft/>
            <HeaderCommon/>
            <MarketOverview/>
        </section>
    )
}

export default DisplayCoin;
