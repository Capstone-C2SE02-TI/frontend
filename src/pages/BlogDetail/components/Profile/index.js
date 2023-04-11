import Image from '~/components/Image/Image';
import DefaultAvatar from '~/assets/images/DefaultAvatar.png';
import classNames from 'classnames/bind';
import styles from '../../BlogDetail.module.scss';

const cx = classNames.bind(styles);

function Profile() {
  return (
    <div className={cx('profile')}>
      <Image width="150" className={cx('profile-image')} src={DefaultAvatar} alt="logo" />
      <div className={cx('profile-name')}>
        <h5>Andrew</h5>
        <h6>Investor</h6>
      </div>
    </div>
  );
}

export default Profile;
