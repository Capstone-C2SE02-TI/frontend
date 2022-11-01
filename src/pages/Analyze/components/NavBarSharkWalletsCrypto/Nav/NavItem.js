
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
const cx = classNames.bind(styles);

function NavItem({ title, onClick, className }) {
    return (
        <p className={className} onClick={onClick}>
            <span className={cx('nav-item__title')}>{title}</span>
        </p>
    );
}

export default NavItem;
