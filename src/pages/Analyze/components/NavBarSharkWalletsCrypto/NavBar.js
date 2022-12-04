import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import NavItem from './Nav/NavItem';
import Nav from './Nav';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { searchTextCryptoWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { useEffect } from 'react';
import { useDebounced } from '~/hooks';
const cx = classNames.bind(styles);

function NavBar({ onChangeTab, currentTAb }) {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const textSearchDebounced = useDebounced(searchText, 500);

    useEffect(() => {
        dispatch(searchTextCryptoWallet(searchText));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textSearchDebounced]);

    const handleSubmitSearchCoin = (e) => {
        e.preventDefault();
    };

    const searchTextShark = useRef();

    const searchClassName = cx('shark-search', {
        'hide-search-shark': currentTAb !== 'crypto',
    });

    const renderSearch = () => {
        return (
            <div className={searchClassName}>
                <form onSubmit={handleSubmitSearchCoin}>
                    <div className={cx('container__search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search--icon')} />

                        <input
                            ref={searchTextShark}
                            placeholder="Search by name or symbol"
                            spellCheck="false"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        );
    };

    return (
        <Nav>
            <div className="d-flex justify-content-between">
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
            </div>
            {renderSearch()}
        </Nav>
    );
}

export default NavBar;
