import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CopyOverview.module.scss';
import Button from '~/components/Button/Button';


const cx = classNames.bind(styles);

const CopyOverview = () => {
    const handleNavigate = () => {

    }
    return (
        <div className={cx('containerfluid-copy-overview')}>
            <div className={cx('container-copy-overview')}>
                <div className={cx('box-copy-overview')}>
                    <h5>Manual Trade</h5>
                    <ul>
                        <li>Easy transaction customization</li>
                        <li>Invest with your knowledge</li>
                        <li>Stop trades easily</li>
                        <li>Deposit to get started</li>
                    </ul>
                    <Link to={'/home-dashboard'}>
                        <Button className={cx('btn-start')} onClick={handleNavigate} linearGradientPrimary>Start</Button>
                    </Link>

                </div>
                <div className={cx('box-copy-overview')}>
                    <h5>Auto Trade</h5>
                    <ul>
                        <li>Generate passive income</li>
                        <li>Suitable for beginners</li>
                        <li>Auto invest for beginners</li>
                        <li>Deposit to get started</li>
                    </ul>
                    <Button className={cx('btn-start')} linearGradientPrimary>Start</Button>


                </div>
            </div>
        </div>
    );
}

export default CopyOverview;
