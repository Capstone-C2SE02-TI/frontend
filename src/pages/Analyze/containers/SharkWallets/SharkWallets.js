import classNames from 'classnames/bind';
import styles from './SharkWallets.module.scss';
import SharkWalletsOverview from '../../components/SharkWalletsOverview/SharkWalletsOverview';
import { Row, Col } from 'antd';
import SharkWalletsCrypto from '../../components/SharkWalletsCrypto/SharkWalletsCrypto';

const cx = classNames.bind(styles);
function SharkWallets() {
    return (
        <section className={cx('shark-wallet')}>
            <span>Dashboard &gt; SharkWallets</span>
            <div className={cx('shark-wallet__content')}>
                <h2>SHARK WALLETS</h2>
            </div>
            <Row>
                <Col span={8}>
                    <SharkWalletsOverview/>
                </Col>
                <Col span={15}>
                    <SharkWalletsCrypto/>
                </Col>
            </Row>
        </section>
    );
}

export default SharkWallets;
