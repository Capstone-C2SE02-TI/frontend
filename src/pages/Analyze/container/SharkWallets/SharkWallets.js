import classNames from 'classnames/bind';
import styles from './SharkWallets.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'antd';
import SharkWalletCoin from './SharkWalletCoin';

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
                    <div className={cx('shark-overview')}>
                        <div className={cx('shark-search')}>
                            <input placeholder='Search...'></input>
                            <div className={cx('shark-category')}>
                                <p>All categories</p>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        </div>
                        <table className={cx('table-shark')}>
                            <thead>
                                <tr>
                                    <th>Shark</th>
                                    <th>Total assets</th>
                                    <th>24%</th>
                                    <th>Follow</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SharkWalletCoin/>
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col span={16}>

                </Col>
            </Row>
        </section>
    );
}

export default SharkWallets;
