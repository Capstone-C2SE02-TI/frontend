import classNames from 'classnames/bind';
import React from 'react';
import styles from './MarketOverview.module.scss';
const cx = classNames.bind(styles);

function Pagination({coinsPerPage, totalCoins}) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalCoins/coinsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={cx('pagination')}>
                {
                    pageNumbers.map(number => (
                        <li key={number} className={cx('page-item')}>
                            <a href='#' className={cx('page-link')}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
export default Pagination;