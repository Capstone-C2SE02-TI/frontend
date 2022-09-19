import { useState } from 'react';
import classNames from 'classnames/bind';
// import {classNames as classNameCustome} from 'classnames';
import { Link } from 'react-router-dom';
import styles from './NavLeft.module.scss';
import {
    faHouse,
    faMagnifyingGlass,
    faChartSimple,
    faFlag,
    faCaretDown,
    faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function ItemSubNav({ index, item }) {
    const [showDropdownSidebar, setShowDropdownSidebar] = useState(false);
    const classNamesIcon = cx('iconDropdown', {
        'iconDropdown--active': showDropdownSidebar,
    });;
    return (
        <li key={index} className={cx('listItem')} onClick={() => setShowDropdownSidebar(!showDropdownSidebar)}>
            <Link to={'#'}>
                <div className={cx('iconBox')}>
                    <FontAwesomeIcon className={cx('icon')} icon={item.icon} />
                    <span>{item.title}</span>
                </div>
                {item.iconDropdown && <FontAwesomeIcon className={classNamesIcon} icon={faCaretDown} />}
            </Link>
            {showDropdownSidebar === true && (
                <ul>
                    {item.children.map((subnav, index) => {
                        return (
                            <li key={index}>
                                <span>{subnav}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
        </li>
    );
}

export default ItemSubNav;
