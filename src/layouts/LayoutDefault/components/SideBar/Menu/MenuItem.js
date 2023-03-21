import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { memo } from 'react';

import ModalConfirm from '../../ModalConfirm';
const cx = classNames.bind(styles);

function MenuItem({ icon, title, to, key, isPremium, requiredPremium =false }) {
    const [openModalNotify, setOpenModalNotify] = useState(false);

    const handleClick1 = (e) => {
        if (isPremium) {
            setOpenModalNotify(true);
            e.preventDefault();
        } else {
        }
    };
    const navigate = useNavigate();
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
                {/* {requiredPremium && <button className={cx('btn-connection')}>Vip</button>} */}
            </NavLink>
            {openModalNotify && (
                <ModalConfirm
                    typeSuccess={true}
                    title="Upgrade premium"
                    description="You should upgrade Premium!"
                    modalIsOpen={openModalNotify}
                    closeModal={() => setOpenModalNotify(false)}
                    onHandleAction={() => navigate('/upgrade')}
                />
            )}
        </div>
    );
}

export default memo(MenuItem);
