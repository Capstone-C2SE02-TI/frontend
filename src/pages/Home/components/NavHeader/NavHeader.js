import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from '../../Home.module.scss';

const cx = classNames.bind(styles);
function NavHeader() {
    return (
        <nav className={cx('NavHeader')}>
            <ul className={cx('NavHeader-list')}>
                <li><Link to={""}>Documentation</Link></li>
                <li><Link to={""}>Scan Wallets</Link></li>
                <li><Link to={"/blog"}>Blog</Link></li>
                <li><Link to={""}>Contact</Link></li>
                <li><Link to={""}>About us</Link></li>
            </ul>
        </nav>
    )
}

export default NavHeader