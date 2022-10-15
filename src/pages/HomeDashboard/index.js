import AssetCoins from "./components/AssetCoins/AssetCoins";
import MarketOverview from "./components/MarketOverview/MarketOverview";
import Portfolio from "./components/Portfolio/Portfolio";
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';

const cx = classNames.bind(styles);
function HomeDashboard() {
   
  

    return (
        <section className={cx('HomeDashboard-container')}>
           
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