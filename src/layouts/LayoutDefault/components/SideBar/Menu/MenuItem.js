import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.modules.scss';
const cx = classNames.bind(styles);

function MenuItem({ icon, title, to }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('menu-item__icon')}>{icon}</span>
            <span className={cx('menu-item__title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;