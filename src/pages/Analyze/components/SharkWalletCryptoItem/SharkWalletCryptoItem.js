import React, { useRef } from 'react';
import millify from 'millify';
import styles from './SharkWalletCryptoItem.module.scss';
import classNames from 'classnames/bind';
import numberWithCommas from '~/helpers/numberWithCommas';
import Image from '~/components/Image/Image';
import { Fragment } from 'react';
import { useOnclickOutSide } from '~/hooks';
import TradeItem from './../TradeItem/TradeItem';
import { CaretNextIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { sharkWalletIdSelector, tradeTransactionHistorySelector } from '~/modules/SharkWallet/selector';
import { fetchTradeTransactionHistory } from '~/modules/SharkWallet/sharkWalletSlice';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function SharkWalletCryptoItem({ data, index, totalAssetCrypto }) {
    const [isShowTrade, setIsShowTrade] = React.useState(false);

    const refCryptoParent = useRef();
    const refCryptoChildren = useRef();

    useOnclickOutSide(refCryptoChildren, (e) => {
        if (!refCryptoParent.current?.contains(e.target)) {
            setIsShowTrade(false);
        }
    });

    const btnMoreClassName = cx('btn-show-more', {
        'btn-show-more--active': isShowTrade,
    });
    const sharkIdSelected = useSelector(sharkWalletIdSelector);
    const tradeTransactionHistory = useSelector(tradeTransactionHistorySelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isShowTrade) {
            dispatch(fetchTradeTransactionHistory({ sharkId: sharkIdSelected, coinSymbol: data.symbol }));
        }
    }, [isShowTrade, dispatch, sharkIdSelected, data.symbol]);

    return (
        <Fragment>
            <tr
                className={cx('tr-crypto__item')}
                ref={refCryptoParent}
                onClick={() => {
                    setIsShowTrade(!isShowTrade);
                }}
            >
                <td className={btnMoreClassName}>
                    <CaretNextIcon width="16" height="16" />
                </td>
                {
                    <ul className={cx('crypto-item')}>
                        <li>
                            <div className={cx('cryto-item__info')}>
                                <div className={cx('crypto-item__Text')}>
                                    <Image width="22" className={cx('people-image')} src={data.iconURL} alt="logo" />
                                    <p>
                                        {data.name} ({data.symbol}) - ${String(data.price)}
                                    </p>
                                </div>
                                <span>Rank#{data.cmcRank}</span>
                            </div>
                        </li>

                        <li>
                            {data.tagNames.slice(0, 3).map((tagname, index) => (
                                <span key={index}>{tagname}</span>
                            ))}
                        </li>
                    </ul>
                }
                <td>
                    {millify(data.quantity, {
                        precision: 3,
                        decimalSeparator: ',',
                    })}
                </td>
                <td>
                    ${numberWithCommas(data.total)}({((data.total / totalAssetCrypto) * 100).toFixed(4)}%)
                </td>
            </tr>

            {tradeTransactionHistory && isShowTrade &&
                (
                    <TradeItem
                        refChild={refCryptoChildren}
                        coinInfoData={tradeTransactionHistory.datas.coinInfo}
                        historyData={tradeTransactionHistory.datas.historyData}
                    />
                )}
        </Fragment>
    );
}

export default SharkWalletCryptoItem;
