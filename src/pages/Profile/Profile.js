import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);
function Profile() {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_profile')}>
                <h1>Portfolio shark followed</h1>
            </div>
        </div>
    );


}

export default Profile;
