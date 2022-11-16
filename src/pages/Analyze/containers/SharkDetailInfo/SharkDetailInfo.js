import { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './SharkDetailInfo.module.scss';
import { useSelector } from 'react-redux';
import { convertStringToTimeCurrent, numberWithCommas } from '~/helpers';
import {
    sharkCryptoSelector,
    sharkInfoSelector,
    sharkTransactionHistorySelector,
    sharkWalletAddressSelector,
} from '~/modules/SharkWallet/selector';
import DoughnutChart from '../../components/DoughnutChart';

const cx = classNames.bind(styles);

function SharkDetailInfo({ currentTabSharkWallet }) {
    const sharkAddressSelected = useSelector(sharkWalletAddressSelector);
    const sharkTransactionHistory = useSelector(sharkTransactionHistorySelector);
    const sharkInfoCurrent = useSelector(sharkInfoSelector);
    const sharkCrypto = useSelector(sharkCryptoSelector);

    const firstTransactionTime = useMemo(() => {
        const listDate = sharkTransactionHistory.map((value) => {
            return Number(value.timeStamp);
        });
        return listDate.reduce((currDate, valueDate) => {
            return currDate > valueDate ? valueDate : currDate;
        }, listDate[0]);
    }, [sharkTransactionHistory]);

    const totalValueIn = useMemo(() => {
        return sharkTransactionHistory.reduce((totalValue, transaction) => {
            const passValue = transaction.pastPrice === 0 ? 1 : transaction.pastPrice;
            return sharkAddressSelected.localeCompare(transaction.from) === 0
                ? totalValue + transaction.numberOfTokens * passValue
                : totalValue;
        }, 0);
    }, [sharkAddressSelected, sharkTransactionHistory]);

    const totalValueOut = useMemo(() => {
        return sharkTransactionHistory.reduce((totalValue, transaction) => {
            const passValue = transaction.pastPrice === 0 ? 1 : transaction.pastPrice;
            return sharkAddressSelected.toLowerCase().localeCompare(transaction.to.toLowerCase()) === 0
                ? totalValue + transaction.numberOfTokens * passValue
                : totalValue;
        }, 0);
    }, [sharkAddressSelected, sharkTransactionHistory]);

    return (
        currentTabSharkWallet === 'detail-info' && (
            <div className={cx('detail-info__container')}>
                <DoughnutChart className={cx('chart-circle')} cryptosSharkWallet={sharkCrypto} />
                <h3>Token holders chart</h3>
                <table className={cx('detail-info__table')}>
                    <thead>
                        <tr>
                            <th className={cx('detail-info__th')}>Item</th>
                            <th className={cx('detail-info__th')}>Detail info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Name</td>
                            <td className={cx('detail-info__td')}>Shark {sharkInfoCurrent.id}</td>
                        </tr>
                        <tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Address</td>
                            <td className={cx('detail-info__td')}>{sharkAddressSelected}</td>
                        </tr><tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Total transactions</td>
                            <td className={cx('detail-info__td')}>{sharkTransactionHistory.length}</td>
                        </tr><tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>First transaction</td>
                            <td className={cx('detail-info__td')}>{firstTransactionTime ? convertStringToTimeCurrent(firstTransactionTime) : 0}</td>
                        </tr><tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Total assets ($)</td>
                            <td className={cx('detail-info__td')}>{numberWithCommas(sharkInfoCurrent.totalAsset)} $</td>
                        </tr><tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Total value in ($)</td>
                            <td className={cx('detail-info__td')}>{numberWithCommas(totalValueIn)} $</td>
                        </tr><tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Total value out ($)</td>
                            <td className={cx('detail-info__td')}>{numberWithCommas(totalValueOut)} $</td>
                        </tr><tr className={cx('detail-info__tr')}>
                            <td className={cx('detail-info__td')}>Actual growth ($)</td>
                            <td className={cx('detail-info__td')}>{numberWithCommas(totalValueIn - totalValueOut)} $</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    );
}

export default SharkDetailInfo;
