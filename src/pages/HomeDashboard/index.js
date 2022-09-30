import AssetCoins from "./Components/AssetCoins/AssetCoins";
import MarketOverview from "./Components/MarketOverview/MarketOverview";
import Portfolio from "./Components/Portfolio/Portfolio";
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';
const cx = classNames.bind(styles);
function HomeDashboard() {
    return (
        <section className={cx("HomeDashboard-container")}>
            <Row>
                <Col span={18}>
                    <AssetCoins/>
                    <MarketOverview/>
                </Col>
                <Col span={6}>
                    <Portfolio/>
                </Col>
            </Row>
            
        </section>
    )
}

export default HomeDashboard;