import PropTypes from 'prop-types';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from './MenuProfile.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classNames = cx('menu-item', {
        separate: data.separate,
    });
    
    return (
        <Button className={classNames} leftIcon={data.icon} onClick={onClick} to={data.to}>
            {data.title}
        </Button>
    );
}
MenuItem.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
};
export default MenuItem;
