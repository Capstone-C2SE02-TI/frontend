import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MenuProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header({ onBack, title }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h6 className={cx('header-title')}>{title}</h6>
        </header>
    );
}
Header.propTypes = {
    onBack: PropTypes.func,
    title: PropTypes.string.isRequired,
};
export default Header;
