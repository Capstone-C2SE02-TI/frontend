import classNames from "classnames/bind";
import styles from './RecommendAccountFollow.module.scss'

import { ArrowLeftIcon, ArrowRightIcon } from "~/components/Icons";
import RecommendItem from "../../components/RecommendItem";
const cx = classNames.bind(styles);


function RecommendAccountFollow() {
    return (
        <div className={cx('recommend-account-follow')}>
            <div className={cx('heading-follow')}>
                <span>Recommended Accounts</span>
                <div className={cx('pagination-follow')}>
                    <ArrowLeftIcon />
                    <ArrowRightIcon />
                </div>
            </div>
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
            <RecommendItem />
        </div>
    );
}

export default RecommendAccountFollow;