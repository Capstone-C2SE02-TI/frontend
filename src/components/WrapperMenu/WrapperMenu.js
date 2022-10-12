import classNames from 'classnames/bind';
import styles from './WrapperMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useDebounced from '~/hooks/useDebounced';
// import MenuItem from './MenuItem';
// import { memo } from 'react';
import { useDispatch } from 'react-redux';
import discoverSlice from '~/modules/Discover/discoverSlice';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function WrapperMenu({ data, onRequestClose, itemSelected }) {
    const [searchText, setSearchText] = useState('');

    const searchTextDebounce = useDebounced(searchText, 500);

    const searchTextCategory = useRef();
    const dispatch = useDispatch();

    const handleChooseFilter = (tagname) => {
        dispatch(discoverSlice.actions.categoryFilterChange(tagname));
        onRequestClose();
    };

    const handleSearchCategory = (searchText) => {
        return data.filter((category) => category.name.toLowerCase().includes(searchText.toLowerCase()));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentValueFirstly = handleSearchCategory(searchTextDebounce)[0]?.name;
        const currentValueTextSearch = searchTextCategory.current.value;

        if (currentValueTextSearch) {
            dispatch(
                discoverSlice.actions.categoryFilterChange(
                    currentValueFirstly ? currentValueFirstly : currentValueTextSearch,
                ),
            );
        } else {
            dispatch(discoverSlice.actions.categoryFilterChange(''));
        }

        onRequestClose();
    };
    const handleSelectAllCategories = () => {
        dispatch(discoverSlice.actions.categoryFilterChange(''));
        onRequestClose();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <div className={cx('container__search')}>
                        <input
                            ref={searchTextCategory}
                            placeholder="Search"
                            spellCheck="false"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search--icon')} />
                    </div>
                </form>
                <div className={cx('container__content')}>
                    <h6 className={cx('container__content--heading')}>
                        Popular Categories
                        <span onClick={handleSelectAllCategories}>All Categories</span>
                    </h6>
                    <div className={cx('container__content--list')}>
                        {handleSearchCategory(searchTextDebounce).map((item) => (
                            <span
                                className={cx('container__content--list--name')}
                                key={item.id}
                                onClick={() => handleChooseFilter(item.name)}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WrapperMenu;
