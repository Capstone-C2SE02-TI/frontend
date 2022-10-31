import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import NavItem from './Nav/NavItem';
import Nav from './Nav';
const cx = classNames.bind(styles);

function NavBar({onChangeTab}) {
    return (
        <Nav>
            <NavItem title="Crypto" to="/analyze" onClick={() => onChangeTab('crypto')} />
            <NavItem title="Transaction history" to="/analyze" onClick={() => onChangeTab('transaction-history')} />
            <NavItem title="Detail info" to="/analyze" onClick={() => onChangeTab('detail-info')} />
        </Nav>
    );
}

export default NavBar;
