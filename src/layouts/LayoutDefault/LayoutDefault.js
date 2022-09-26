import classNames from "classnames/bind";
import styles from './LayoutDefault.module.scss'
import { Col, Row } from 'antd';
import SideBar from "./components/SideBar";

const cx = classNames.bind(styles);


function LayoutDefault({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col span={4}>
                    <SideBar />
                </Col>
                <Col span={20}>{children}</Col>
                
            </Row>
        </div>
    );
}

export default LayoutDefault;