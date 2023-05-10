import React, { useEffect } from 'react';
import styles from './CopyTrading.module.scss';
import classNames from 'classnames/bind';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import CopyTradingListShark from './containers/CopyTradingListShark/CopyTradingListShark';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sharkFollowedSelector } from '~/modules/SharkFollowed/selector';
import { fetchSharkFollowed } from '~/modules/SharkFollowed/sharkFollowedSlice';
import { userIsPremiumSelector } from '~/modules/user/auth/selectors';

const cx = classNames.bind(styles);

const CopyTrading = () => {
    const dispatch = useDispatch();

    const sharkFolloweds = useSelector(sharkFollowedSelector);
    const ethAddress = localStorage.getItem('eth_address');

    useEffect(() => {
        dispatch(fetchSharkFollowed(ethAddress));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, ethAddress]);

    const userIsPremium = useSelector(userIsPremiumSelector);

    const navigate = useNavigate();

    // const searchTextShark = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className={cx('container-fluid')}>
            <div className={cx('bg-copy')}>
                <h1>Copy Trading</h1>
                <h3>Accumulate Crypto on Autopilot</h3>
                <Image className={cx('bg-copy--image')} src={images.bgCopyTrading} alt="background-copyTrading" />
            </div>
            <div className={cx('copy-step')}>
                <div className={cx('copy-step--left')}>
                    <h3>Create your own copy-Invest Plan</h3>
                    <h4>Regularly invest in cryptocurrency with a pre-determined amount and accumulate your crypto holdings</h4>
                    <div className={cx('copy-step--into')}>
                        <div className={cx('step-box')}>
                            <p>1</p>
                            <h6>Start creating your Auto-Invest Plan</h6>
                        </div>
                        <div className={cx('step-box')}>
                            <p>2</p>
                            <h6>Enjoy the Auto-Invest plan while earning passive income</h6>
                        </div>
                    </div>
                </div>
                <div className={cx('copy-step--right')}>
                    <Image className={cx('bg-copy--small')} src={images.bgCopySmall} alt="background-copyTrading" />
                </div>
            </div>
            <div className={cx('copy-trading--main')}>
                <div className={cx('copy-trading--content')}>
                    <div className={cx('copy-trading--text')}>
                        <h3>Copy-Trading</h3>
                        <h6>#Start growing your assets on autopilot</h6>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('container__search')}>
                            <input
                                // ref={searchTextShark}
                                placeholder="Search by ID shark"
                                spellCheck="false"
                            // value={searchText}
                            // onChange={(e) => setSearchText(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search--icon')} />
                        </div>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr className={cx('copy-trading--head')}>
                            <th>SHARK</th>
                            <th>TOTAL ASSETS</th>
                            <th>24H%</th>
                            <th>Pair trading</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {userIsPremium ? (
                        <tbody>
                            {sharkFolloweds
                                .slice()
                                .sort((prev, next) => prev.sharkId - next.sharkId)
                                .map((sharkFollowed, index) => (
                                    <CopyTradingListShark
                                        key={sharkFollowed.sharkId}
                                        dataSharkFollowed={sharkFollowed}
                                    />
                                ))}
                        </tbody>
                    ) : (
                        <div className={cx('d-flex flex-column align-items-center')}>
                            <img
                                width="216"
                                src="https://s2.coinmarketcap.com/static/cloud/img/posts/no-post.png?_=b8777e5"
                                alt="nothing-here"
                            />
                            <p style={{ margin: '0px', color: 'rgb(34, 37, 49)', fontSize: '28px', fontWeight: ' 700' }}>
                                Nothing here!
                            </p>
                            <p style={{ color: 'rgb(128, 138, 157)', padding: '12px' }}>
                                You can discover and follow shark accounts that interest you! If you update your premium
                                account!
                            </p>
                            <Button primary onClick={() => navigate('/upgrade')} y>
                                Upgrade premium account
                            </Button>
                        </div>
                    )}
                </table>
                {sharkFolloweds.length === 0 && <div className="text-center">No data</div>}
            </div>
        </div>
    );
}

export default CopyTrading;
