import classNames from "classnames/bind";
import styles from './NoData.module.scss'

import { Nodata } from "../Icons";

const cx = classNames.bind(styles);

function NoData({ searchText ='', tagNameCurrent='', type='' }) {
    return (
        <div className={cx('no-data')}>
            <Nodata className={cx('no-data__icon')} />
            <div className={cx('no-data__title')}>
                NO DATA <span>{searchText || type + ' '  + tagNameCurrent}</span>
            </div>
        </div>
    );
}

export default NoData;