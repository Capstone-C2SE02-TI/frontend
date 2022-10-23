import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';
import Image from '~/components/Image/Image';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Portfolio({ data }) {
    const navigate = useNavigate();
    const userInfo = useSelector(userInfoSelector);

    return (
        <section className={cx('portfolio-container')}>
            <div className={cx('profile')}>
                <Image
                    width="150"
                    className={cx('profile-image')}
                    src={userInfo.avatar || images.userAvatar}
                    alt="logo"
                />
                <h5>{data.username}</h5>
            </div>
            <ul className={cx('account')}>
                <li>Upgrade Premium</li>
                <li onClick={() => navigate('/profile')}>Your profile</li>

                <li>Sign out</li>
            </ul>
        </section>
    );
}

export default Portfolio;
