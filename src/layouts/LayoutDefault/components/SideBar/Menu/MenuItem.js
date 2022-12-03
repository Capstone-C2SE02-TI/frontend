import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { memo } from 'react';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function MenuItem({ icon, title, to, key, isPremium }) {

    
    const handleClick1 = (e) => {
        // if (isPremium) {
        //     console.log('can premium');
        //     e.preventDefault();
        // } else {
        //     console.log('ko can premium');
        // }
    };

    return (
        <div className={cx('wrapper')}>
            <NavLink
                key={key}
                className={(nav) => cx('menu-item', { active: nav.isActive })}
                to={to}
                onClick={handleClick1}
            >
                {icon}
                <span className={cx('menu-item__title')}>{title}</span>
            </NavLink>
            <div className={cx('menu-item-tippy-container')}>
                <div className={cx('container-tippy')}>
                    <p className={cx('container-tippy-title')}>Thưởng thức Bài hát đã thích</p>
                    <p className={cx('container-tippy-desc')}>
                        Đăng nhập để xem tất cả bài hát bạn đã thích trong một danh sách phát đơn giản.
                    </p>
                    <div className={cx('div-action-tippy')}>
                        <Button>Để sau</Button>
                        <Button>Đăng nhập</Button>
                    </div>
                </div>
            </div>
            <div className={cx('tippy-arrow')}>

            </div>
        </div>
    );
}

export default memo(MenuItem);
