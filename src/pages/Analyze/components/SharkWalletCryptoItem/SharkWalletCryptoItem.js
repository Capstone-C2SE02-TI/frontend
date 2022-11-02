import styles from './SharkWalletCryptoItem.module.scss';
import classNames from 'classnames/bind';
import numberWithCommas from '~/helpers/numberWithCommas';
import Image from '~/components/Image/Image';
const cx = classNames.bind(styles);


function SharkWalletCryptoItem({ data, index }) {
  
    return (
        <tr className={cx('tr-crypto__item')}>
            <td>#{index + 1}</td>
            {
                <ul className={cx('crypto-item')}>
                    <li>
                        <div className={cx('cryto-item__info')}>
                            <Image width="22" className={cx('people-image')} src={data.iconURL} alt="logo" />
                            <p>
                                {data.name} ({data.symbol}) - ${data.price.toFixed(3)}
                            </p>
                        </div>
                    </li>
                    <li>
                        <span>Rank#{data.cmcRank}</span>
                    </li>
                    <li>
                        {data.tagNames.slice(0, 4).map((tagname, index) => (
                            <span key={index}>{tagname}</span>
                        ))}
                    </li>
                </ul>
            }
            <td>{numberWithCommas(data.quantity)}</td>
            <td>${numberWithCommas(data.total)}(100%)</td>
        </tr>
    );
}

export default SharkWalletCryptoItem;
