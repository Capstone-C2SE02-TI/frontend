import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';
import Image from '~/components/Image/Image';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Portfolio({ data }) {
    const navigate = useNavigate();

    return (
        <section className={cx('portfolio-container')}>
            <div className={cx('profile')}>
                <Image width="150" className={cx('profile-image')} src={data.avatar} alt="logo" />
                <h5>{data.username}</h5>
            </div>
            <ul className={cx('account')}>
                <li>Upgrade Premium</li>
                <li onClick={() => navigate('/profile')}>
                    Your profile
                </li>

                <li>Sign out</li>
            </ul>
        </section>
    );
}

export default Portfolio;
