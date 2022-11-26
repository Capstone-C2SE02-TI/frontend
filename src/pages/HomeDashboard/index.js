import AssetCoins from "./containers/AssetCoins/AssetCoins";
import MarketOverview from "./containers/MarketOverview/MarketOverview";
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';
import ModalNotify from "~/components/ModalNotify";

const cx = classNames.bind(styles);
function HomeDashboard() {
    return (
        <section className={cx('HomeDashboard-container')}>   
        {/* <ModalNotify />     */}
            <Row>
                <Col span={24} className={cx('asset-container')}>
                    <AssetCoins />
                    <MarketOverview />
                </Col>
            </Row>
        </section>
    );
}

export default HomeDashboard;