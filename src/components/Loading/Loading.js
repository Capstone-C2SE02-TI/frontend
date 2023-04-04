import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import SyncLoader from 'react-spinners/SyncLoader';

const cx = classNames.bind(styles);

function Loading({ loading }) {

    if(!loading) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>

            <div className={cx('container')}>
                <SyncLoader
                    color="rgb(0, 255, 204)"
                    loading={loading}
                    // cssOverride={override}
                    size={12}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Loading;
