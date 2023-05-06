import AssetCoins from './containers/AssetCoins/AssetCoins';
import MarketOverview from './containers/MarketOverview/MarketOverview';
import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './HomeDashboard.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newTransactionsSelector } from '~/modules/SharkFollowed/selector';

const cx = classNames.bind(styles);
function HomeDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchNewTransactions('9'));
    const interval = setInterval(() => {
      console.log('new transaction');
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          const notification = new Notification('New transactions of shark ' + Math.random() * 10, {
            body: 'New Transactions of Shark (' + Date.now() + ')',
            data: { timestamp: Date.now(), data: 'hi' }
          });

          notification.addEventListener("click", (ev) =>{
            window.open("http://localhost:3000/discover")
          })
          

        }
      });
      // dispatch(fetchNewTransactions('9'))
      // console.log("run", notifyTransactions);1
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let notifyTransactions = useSelector(newTransactionsSelector);
  console.log('run', notifyTransactions);

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
