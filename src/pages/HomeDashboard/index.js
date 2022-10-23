import AssetCoins from "./containers/AssetCoins/AssetCoins";
import MarketOverview from "./containers/MarketOverview/MarketOverview";
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';
import { fetchGetUserInfo } from "~/modules/user/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);
function HomeDashboard() {
    const { userId } = JSON.parse(localStorage.getItem('userInfo'));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("navigate");
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
         }
     }, [dispatch, userId]);

    return (
        <section className={cx('HomeDashboard-container')}>          
            <Row>
                <Col span={24} className={cx('asset-container')}>
                    <AssetCoins />
                    <MarketOverview />
                </Col>s
            </Row>
        </section>
    );
}

export default HomeDashboard;