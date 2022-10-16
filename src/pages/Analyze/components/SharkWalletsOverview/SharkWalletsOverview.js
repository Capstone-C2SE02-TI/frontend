import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import SharkWalletCoin from './SharkWalletItem';
import classNames from 'classnames/bind';

import styles from './SharkWalletsOverview.module.scss';

const cx = classNames.bind(styles);

function SharkWalletsOverview () {
    return (
        <div className={cx('shark-overview')}>
                        <div className={cx('shark-search')}>
                            <input placeholder='Search...'></input>
                            <div className={cx('shark-category')}>
                                <p>All categories</p>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        </div>
                        <table className={cx('table-shark')}>
                            <thead>
                                <tr>
                                    <th>Shark</th>
                                    <th>Total assets</th>
                                    <th>24%</th>
                                    <th>Follow</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SharkWalletCoin/>
                            </tbody>
                        </table>
                    </div>
    );
}

export default SharkWalletsOverview;
