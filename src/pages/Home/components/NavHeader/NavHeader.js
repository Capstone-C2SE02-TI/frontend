import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from '../../Home.module.scss';

const cx = classNames.bind(styles);
function NavHeader() {
    return (
        <nav className={cx('NavHeader')}>
            <ul className={cx('NavHeader-list')}>
                <Link to={""}><li>Documentation</li></Link>
                <Link to={""}><li>Scan Wallets</li></Link>
                <Link to={""}><li>Blog</li></Link>
                <Link to={""}><li>Contact</li></Link>
                <Link to={""}><li>About us</li></Link>
            </ul>
        </nav>
    )
}

export default NavHeader