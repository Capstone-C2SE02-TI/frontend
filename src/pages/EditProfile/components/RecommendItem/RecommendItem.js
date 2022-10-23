import classNames from "classnames/bind";
import styles from './RecommendItem.module.scss'
import  Button  from '~/components/Button';
const cx = classNames.bind(styles);


function RecommendItem() {
    return (
        <div className={cx('recommend-item')}>
            <div className={cx('recommend-item-info')}>
                <img
                    className={cx('icon-coin')}
                    src={'https://s3.coinmarketcap.com/static/img/portraits/6225bb3ee89bc32c2edec857.png'}
                    alt=""
                />
                <div className={cx('recommend-item-name')}>
                    <span>
                        ApolloX
                        <img
                            src="https://s2.coinmarketcap.com/static/cloud/img/icon/certified.svg?_=b8777e5"
                            alt="certified"
                        />
                    </span>
                    <p>@ApolloX</p>
                </div>
            </div>
            <div className={cx('recommend-item-follow')}>
                <Button dark >+ Follow</Button>
            </div>
        </div>
    );
}

export default RecommendItem;