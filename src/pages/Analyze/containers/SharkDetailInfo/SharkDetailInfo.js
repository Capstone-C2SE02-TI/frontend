import { useMemo } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import styles from './SharkDetailInfo.module.scss';
import { useSelector, useDispatch } from 'react-redux';
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
            <div>
                <h3>Token holders chart</h3>
                <DoughnutChart cryptosSharkWallet={sharkCrypto} />
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-evenly">
                        <h4>ITEM</h4>
                        <h4>DETAIL INFO</h4>
                    </div>
                    <div>
                        <div className="d-flex justify-content-evenly">
                            <span>Name</span>
                            <p>Shark {sharkInfoCurrent.id}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span>Address</span>
                            <p>{sharkAddressSelected}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span>Total transactions</span>
                            <p>{sharkTransactionHistory.length}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span>First transaction</span>
                            <p>{firstTransactionTime ? convertStringToTimeCurrent(firstTransactionTime) : 0}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span>Total assets ($)</span>
                            <p>{numberWithCommas(sharkInfoCurrent.totalAsset)}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span>Total value in ($)</span>
                            <p>{numberWithCommas(totalValueIn)}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span>Total value out ($)</span>
                            <p>{numberWithCommas(totalValueOut)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default SharkDetailInfo;
