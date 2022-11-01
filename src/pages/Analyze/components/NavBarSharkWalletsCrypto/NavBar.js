import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import NavItem from './Nav/NavItem';
import Nav from './Nav';
const cx = classNames.bind(styles);

function NavBar({ onChangeTab, currentTAb }) {

    return (
        <Nav>
            <NavItem
                title="Crypto"
                className={cx('nav-item', currentTAb === 'crypto' ? currentTAb : '')}
                onClick={() => onChangeTab('crypto')}
            />
            <NavItem
                title="Transaction history"
                className={cx('nav-item', currentTAb === 'transaction-history' ? currentTAb : '')}
                onClick={() => onChangeTab('transaction-history')}
            />
            <NavItem
                title="Detail info"
                className={cx('nav-item', currentTAb === 'detail-info' ? currentTAb : '')}
                onClick={() => onChangeTab('detail-info')}
            />
        </Nav>
    );
}

export default NavBar;
