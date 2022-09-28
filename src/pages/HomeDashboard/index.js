import AssetCoins from "./Components/AssetCoins/AssetCoins";
// import MarketOverview from "./Components/MarketOverview/MarketOverview";
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';
const cx = classNames.bind(styles);
function HomeDashboard() {
    return (
        <section className={cx("HomeDashboard-container")}>
            <Row>
                <Col span={18}><AssetCoins/></Col>
                <Col span={2}>Profile</Col>
            </Row>
            
        </section>
    )
}

export default HomeDashboard;