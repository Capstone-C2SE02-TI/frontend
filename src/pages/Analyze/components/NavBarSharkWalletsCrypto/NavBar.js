import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import NavItem from './Nav/NavItem';
import Nav from './Nav';
const cx = classNames.bind(styles);

function NavBar() {
    return (
        <Nav>
            <NavItem title="Crypto" to="/analyze"/>
            <NavItem title="Transaction history" to="/analyze1111" />
            <NavItem title="Detail info" to="/analyze1111" />
        </Nav>
    );
}

export default NavBar;
