import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function NavHeader() {
    return (
        <nav className={cx('NavHeader')}>
            <ul className={cx('NavHeader-list')}>
                <li>
                    <Link to={''}>Documentation</Link>
                </li>
                <li>
                    <Link to={''}>Scan Wallets</Link>
                </li>
                <li>
                    <Link to={''}>Blog</Link>
                </li>
                <li>
                    <Link to={''}>Contact</Link>
                </li>
                <li>
                    <Link to={''}>About us</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavHeader;
