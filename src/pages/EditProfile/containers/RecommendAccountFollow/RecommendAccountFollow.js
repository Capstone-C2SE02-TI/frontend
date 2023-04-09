import classNames from 'classnames/bind';
import styles from './RecommendAccountFollow.module.scss';

import { ArrowLeftIcon, ArrowRightIcon } from '~/components/Icons';
import RecommendItem from '../../components/RecommendItem';
import { useEffect } from 'react';
import { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sharkListSelector } from '~/modules/SharkWallet/selector';
import { useState } from 'react';
import { sliceArrayToPagination } from '~/helpers';
import { useMemo } from 'react';
const cx = classNames.bind(styles);
const NUMBER_ITEM_DISPLAY = 10;

const MAXIMUM_LENGTH = 20;

function RecommendAccountFollow() {
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    const [paginationState, setPaginationState] = useState(1);
    const sharkList = useSelector(sharkListSelector);

    const viewListSharkPagination = useMemo(() => {
        let newSharkFilter = sharkList
            .slice()

            .sort((prev, next) => +next.totalAssets - prev.totalAssets);
        return sliceArrayToPagination(newSharkFilter, paginationState, NUMBER_ITEM_DISPLAY);
    }, [paginationState, sharkList]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSharkWallet(currentUser.userId));
    }, [dispatch]);

    const handleNextPage = (e) => {
        if (paginationState !== MAXIMUM_LENGTH) {
            setPaginationState((prev) => prev + 1);
        } return
    };

    const handlePreviousPage = (e) => {
         if (paginationState !== 1) {
             setPaginationState((prev) => prev - 1);
         }
        return
      
    }

    return (
        <div className={cx('recommend-account-follow')}>
            <div className={cx('heading-follow')}>
                <span>Recommended Shark</span>
                <div className={cx('pagination-follow')}>
                    <div onClick={handleNextPage}>
                        <ArrowLeftIcon  />
                    </div>

                    <div onClick={handlePreviousPage} >
                        <ArrowRightIcon />
                    </div>
                </div>
            </div>
            {viewListSharkPagination.map((shark, index) => (
                <RecommendItem key={index} data={shark} userInfo={currentUser} />
            ))}
        </div>
    );
}

export default RecommendAccountFollow;
