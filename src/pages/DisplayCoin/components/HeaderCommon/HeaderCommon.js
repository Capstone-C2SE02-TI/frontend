import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeaderCommon.module.scss';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function HeaderCommon() {
    return (
        <section className={cx('colMiddle')}>
            <nav className={cx('NavHeader')}>
                <ul className={cx('NavHeader-list')}>
                    <Link to={""}><li>Documentation</li></Link>
                    <Link to={""}><li>Scan Wallets</li></Link>
                    <Link to={""}><li>Blog</li></Link>
                    <Link to={""}><li>Contact</li></Link>
                    <Link to={""}><li>About us</li></Link>
                </ul>
                <h2>Upgrade Premium</h2>
                <Link to={""}>
                    <FontAwesomeIcon className={cx('iconAccount')} icon={faUser} />
                </Link>
        </nav>
        </section>
    )
}

export default HeaderCommon;