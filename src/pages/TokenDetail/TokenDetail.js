import { Col, Row } from 'antd'
import classNames from 'classnames/bind';
import styles from './TokenDetail.module.scss'
import ReferentItem from './components/ReferentItem/ReferentItem';
import WalletStaticsItem from './components/WalletStaticsItem';

const cx = classNames.bind(styles);

function TokenDetail() {
   
    const staticsWallet = () => {
        return (
            <div className={cx('wallet-statics')}>
                <WalletStaticsItem increaseCoin />
                <WalletStaticsItem reduceCoin />
                <WalletStaticsItem increaseCoin />
                <WalletStaticsItem reduceCoin />
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wallet-top-container')}>{staticsWallet()}</div>
            <div className={cx('wallet-bottom-container')}>
                <div className={cx('wallet-content-statics')}>
                    <Row>
                        <Col span={17}>
                            <div className={cx('wallet-chart')}></div>
                        </Col>
                        <Col span={7}>
                            <div className={cx('wallet-referent')}>
                                <h3 className={cx('wallet-referent__heading')}>Trending Cryptos</h3>
                                <ReferentItem />
                                <ReferentItem />
                                <ReferentItem />
                                <ReferentItem />
                                <ReferentItem />
                                <ReferentItem />
                                <ReferentItem />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TokenDetail;