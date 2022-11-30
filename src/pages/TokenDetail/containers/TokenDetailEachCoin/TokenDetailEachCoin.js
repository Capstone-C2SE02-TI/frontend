import classNames from 'classnames/bind';
import { memo } from 'react';
import Image from '~/components/Image/Image';
import styles from './TokenDetailEachCoin.module.scss';
import MenuTippy from './MenuTippy';
import numberWithCommas from '~/helpers/numberWithCommas';
import { CaretDownIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function TokenDetailEachCoin({ data, community }) {
  
    return (
        <section className={cx('token-container')}>
            <div>
                <span>Rank #{data.cmcRank}</span>
            </div>
            <div className={cx('token-content__price')}>
                <div className={cx('token-price__inf')}>
                    <h1>Information</h1>
                </div>
            </div>
            <div className={cx('token-content__name')}>
                <Image src={data.iconURL} alt={data.name} />
                <h3>
                    {data.name} {data.symbol}
                </h3>
                <h1>{data.usd.price.toFixed(3)}</h1>
                <span>{Math.round(data.usd.percentChange7d * 100) / 100}%</span>
            </div>

            <div className={cx('token-content__inf')}>
                <nav>
                    <ul>
                        <li>
                            <p>Market Cap</p>
                            <p>${numberWithCommas(data.marketCap.toFixed(0))}</p>
                        </li>
                        <li>
                            <p>24 hours trading vol</p>
                            <p>${numberWithCommas(data.usd.volume24h.toFixed(0))}</p>
                        </li>
                        <li>
                            <p>Fully Diluted Valuation</p>
                            <p>$387,503,617,100</p>
                        </li>
                        <li>
                            <p>24h low</p>
                            <p>$387,503,617,100</p>
                        </li>
                        <li>
                            <p>All-Time Low</p>
                            <p>$387,503,617,100</p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Circulating Supply</p>
                            <p>${numberWithCommas(data.circulatingSupply.toFixed(0))}</p>
                        </li>
                        <li>
                            <p>Total Supply</p>
                            <p>${numberWithCommas(data.totalSupply.toFixed(0))}</p>
                        </li>
                        <li>
                            <p>Max Supply</p>
                            <p>$387,503,617,100</p>
                        </li>
                        <li>
                            <p>24h high</p>
                            <p>$387,503,617,100</p>
                        </li>
                        <li>
                            <p>All-Time High</p>
                            <p>$387,503,617,100</p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Contract</p>
                            <p>$387,503,617,100</p>
                        </li>
                        <li className={cx('detail-tippy-container')}>
                            <p>Website</p>
                            <MenuTippy data={data.urls.website}>
                                <h6 className={cx('detail-tippy')}>
                                    {data.urls.website[0]?.split('/')[2] || 'No link'}
                                </h6>
                            </MenuTippy>
                            <CaretDownIcon className={cx('detail-tippy-caret-down')} />
                        </li>
                        <li className={cx('detail-tippy-container')}>
                            <p>Explorer</p>

                            <MenuTippy data={data.urls.explorer}>
                                <h6 className={cx('detail-tippy')}>
                                    {data.urls.explorer[0]?.split('/')[2] || 'No link'}
                                </h6>
                            </MenuTippy>
                            <CaretDownIcon className={cx('detail-tippy-caret-down')} />
                        </li>
                        <li className={cx('detail-tippy-container')}>
                            <p>Community</p>
                            <MenuTippy data={community}>
                                <h6 className={cx('detail-tippy')}>{community[0]?.split('/')[2] || 'No link'}</h6>
                            </MenuTippy>
                            <CaretDownIcon className={cx('detail-tippy-caret-down')} />
                        </li>
                        <li>
                            <p>Total investment</p>
                            <p>$387,503,617,100</p>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default memo(TokenDetailEachCoin);
