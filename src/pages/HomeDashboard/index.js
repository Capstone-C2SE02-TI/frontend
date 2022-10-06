import AssetCoins from "./Components/AssetCoins/AssetCoins";
import MarketOverview from "./Components/MarketOverview/MarketOverview";
import Portfolio from "./Components/Portfolio/Portfolio";
import { Col, Row } from 'antd';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';
import { MenuIcon } from "~/components/Icons";
import { useDispatch } from "react-redux";
import HomeDashboardSlice from '~/modules/HomeDashboard/HomeDashboardSlice';
const cx = classNames.bind(styles);
function HomeDashboard() {
    const dispatch = useDispatch()
   
    
    const toggleMenu = () => {
    
        dispatch(HomeDashboardSlice.actions.actionSidebar())
    }

    return (
        <section className={cx('HomeDashboard-container')}>
            <Tippy content="Menu" interactive={true} interactiveBorder={20} delay={100} followCursor={true}>
                <button onClick={toggleMenu} className={cx('icon-menu')} >
                    <MenuIcon />
                </button>
            </Tippy>
            <Row>
                <Col span={17} className={cx('asset-container')}>
                    <AssetCoins />
                    <MarketOverview />
                </Col>
                <Col span={6}>
                    <Portfolio />
                </Col>
            </Row>
        </section>
    );
}

export default HomeDashboard;