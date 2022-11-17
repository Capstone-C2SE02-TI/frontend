import React,{ useRef }  from 'react';
import styles from './SharkWalletCryptoItem.module.scss';
import classNames from 'classnames/bind';
import numberWithCommas from '~/helpers/numberWithCommas';
import Image from '~/components/Image/Image';
import { Fragment } from 'react';
import { useOnclickOutSide } from '~/hooks';
import TradeItem from './../TradeItem/TradeItem';
const cx = classNames.bind(styles);


function SharkWalletCryptoItem({ data, index, totalAssetCrypto }) {
   
	const [isShowTrade, setIsShowTrade] = React.useState(false);


    const refCryptoParent = useRef()
    const refCryptoChildren = useRef()


    useOnclickOutSide(refCryptoChildren, (e) => {
        if (!refCryptoParent.current?.contains(e.target)) {
            setIsShowTrade(false);
        }
    });

    return (
        <Fragment>
            <tr
                className={cx('tr-crypto__item')}
                ref={refCryptoParent}
                onClick={() => {
                    setIsShowTrade(!isShowTrade);
                }}
            >
                <td>#{index + 1}</td>
                {
                    <ul className={cx('crypto-item')}>
                        <li>
                            <div className={cx('cryto-item__info')}>
                                <div className={cx('crypto-item__Text')}>
                                    <Image width="22" className={cx('people-image')} src={data.iconURL} alt="logo" />
                                    <p>
                                        {data.name} ({data.symbol}) - ${data.price.toFixed(3)}
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
                <td>{numberWithCommas(data.quantity)}</td>
                <td>
                    ${numberWithCommas(data.total)}({((data.total / totalAssetCrypto) * 100).toFixed(3)}%)
                </td>
            </tr>
            {/* <TradeItem /> */}

            {isShowTrade && <TradeItem refChild={refCryptoChildren } />}
        </Fragment>
    );
}

export default SharkWalletCryptoItem;
