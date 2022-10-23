import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import RecommendAccountFollow from '../EditProfile/containers/RecommendAccountFollow';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { useEffect } from 'react';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Profile() {
    const dispatch = useDispatch();
    const userInfoDetail = useSelector(userInfoSelector);
    const { userId } = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

    const renderProfile = () => {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('profile')}>
                    <div className={cx('profile-avatar')}>
                        <div className={cx('profile-avatar-detail')}>
                            <img src={userInfoDetail.avatar} alt="" />
                        </div>
                        <span>Joined 2022 October</span>
                    </div>

                    <div className={cx('profile-info')}>
                        <span className={cx('profile-info-username')}> {userInfoDetail.username}</span>
                        <p className={cx('profile-info-email')}> {userInfoDetail.email}</p>
                        <div className="d-flex justify-content-between">
                            <div className={cx('profile-info-follow')} style={{ cursor: 'pointer' }}>
                                <span>0</span>
                                <p>Following</p>
                            </div>
                            <div className={cx('profile-info-follow')} style={{ cursor: 'pointer' }}>
                                <span>0</span>
                                <p>Follower</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('profile-edit')} onClick={() => navigate('/edit-profile')}>
                        <img
                            src="https://s2.coinmarketcap.com/static/cloud/img/icon/editor.svg?_=b8777e5"
                            alt="editorIcon"
                        />
                        <span>Edit</span>
                    </div>
                </div>
                <div className={cx('d-flex flex-column align-items-center')}>
                    <img
                        width="216"
                        src="https://s2.coinmarketcap.com/static/cloud/img/posts/no-post.png?_=b8777e5"
                        alt="nothing-here"
                    />
                    <p style={{ margin: '0px', color: 'rgb(34, 37, 49)', fontSize: '28px', fontWeight: ' 700' }}>
                        Nothing here!
                    </p>
                    <p style={{ color: 'rgb(128, 138, 157)' }}>
                        You can post your first tweet, or discover and follow accounts you are interested in!
                    </p>
                    <Button primary>Create new Post</Button>
                </div>
            </div>
        );
    };
    return (
        <div className="d-flex justify-content-between">
            {renderProfile()}
            <RecommendAccountFollow />
        </div>
    );
}

export default Profile;
