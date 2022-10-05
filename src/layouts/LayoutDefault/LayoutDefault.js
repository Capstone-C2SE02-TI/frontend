import classNames from "classnames/bind";
import styles from './LayoutDefault.module.scss'
import { Col, Row } from 'antd';
import SideBar from "./components/SideBar";
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);


function LayoutDefault({ children }) {
    const statusSidebarSelector = useSelector(SidebarSelector);

    const sidebarClassName = cx('sidebar',{
        hideSidebar: !statusSidebarSelector,
    });

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col span={4} className={sidebarClassName}>
                    <SideBar />
                </Col>
                <Col span={statusSidebarSelector ? 20 : 24}>{children}</Col>
            </Row>
        </div>
    );
}

export default LayoutDefault;