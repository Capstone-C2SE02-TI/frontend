import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import Image from '~/components/Image/Image';
import styles from './TokenDetailEachCoin.module.scss';
import MenuTippy from './MenuTippy';
import numberWithCommas from '~/helpers/numberWithCommas';
import { CaretDownIcon } from '~/components/Icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TokenDetailEachCoin({ data, community }) {

    const classNamesStatusCoin7d = cx(data.usd.percentChange7d >= 0 ? 'increase' : 'reduce');

    const [copied, setCopied] = useState(false);
    const defaultPropsTippy = {
        animateFill: false,
        animation: 'scale',
        interactive: true,
        interactiveBorder: 10,
        theme: 'light',
        placement: 'top',
        delay: [1, 200],
    };
    console.log(data)
    return (
        <section className={cx('token-container')}>
            <div className={cx('token-content__price')}>
                <div className={cx('token-price__inf')}>
                    <h1>Information</h1>
                </div>
            </div>
            <div className={cx('token-content__name')}>
                <div className={cx('token-price')}>
                    <Image src={data.iconURL} alt={data.name} />
                    <div className={cx('priceData-content')}>
                        <h6>{data.name}</h6>
                        <span>{data.symbol}</span>
                    </div>
                </div>
                <span>Rank #{data.cmcRank}</span>
            </div>
            <div className={cx('token-price')}>
                <h3>Price: </h3>
                <h2 style={{ color: '#7665d8' }}> {String(data.usd.price)} $</h2>
                <span className={cx(classNamesStatusCoin7d)}>{Math.round(data.usd.percentChange7d * 100) / 100}%</span>
            </div>
            <div className={cx('token-content__inf')}>
                <nav>
                    <ul>
                        <li>
                            <p>Market Cap</p>
                            <p>${numberWithCommas(data.marketCap ? data.marketCap?.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>24 hours trading vol</p>
                            <p>${numberWithCommas(data.usd.volume24h.toFixed(0))}</p>
                        </li>
                        <li>
                            <p>Fully Diluted Valuation</p>
                            <p>${numberWithCommas(data.circulatingSupply ? data.circulatingSupply.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>24h low</p>
                            <p>${numberWithCommas(data.usd._24hLow ? data.usd._24hLow.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>All-Time Low</p>
                            <p>${numberWithCommas(data.usd.allTimeLow ? data.usd.allTimeLow.toFixed(0) : 0)}</p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Circulating Supply</p>
                            <p>${numberWithCommas(data.circulatingSupply ? data.circulatingSupply.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>Total Supply</p>
                            <p>${numberWithCommas(data.totalSupply ? data.totalSupply.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>Max Supply</p>
                            <p>${numberWithCommas(data.maxSupply ? data.maxSupply.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>24h high</p>
                            <p>${numberWithCommas(data.usd._24hHigh ? data.usd._24hHigh.toFixed(0) : 0)}</p>
                        </li>
                        <li>
                            <p>All-Time High</p>
                            <p>${numberWithCommas(data.usd.allTimeHigh ? data.usd.allTimeHigh.toFixed(0) : 0)}</p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p>Contract Address</p>
                            <div className="d-flex justify-content-between">
                                <span style={{ color: '#000' }}>{data.contractAddress.slice(0, 15)}...</span>
                                <Tippy content={!copied ? 'Copy to clipboard' : 'Copied'} {...defaultPropsTippy}>
                                    <div>
                                        <CopyToClipboard text={data.contractAddress} onCopy={() => setCopied(true)}>
                                            <button className={cx('icon-copied')}>
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </Tippy>
                            </div>
                            {/* <span>{copied ? 'Copy to clipboard' : ''}</span> */}
                        </li>
                        <li className={cx('detail-tippy-container')}>
                            <p>Blockchain_site</p>
                            <MenuTippy data={data.urls.blockchain_site}>
                                <h6 className={cx('detail-tippy')}>
                                    {data.urls.blockchain_site[0]?.split('/')[2] || 'No link'}
                                </h6>
                            </MenuTippy>
                            <CaretDownIcon className={cx('detail-tippy-caret-down')} />
                        </li>
                        <li className={cx('detail-tippy-container')}>
                            <p>Homepage</p>

                            <MenuTippy data={data.urls.homepage}>
                                <h6 className={cx('detail-tippy')}>
                                    {data.urls.homepage[0]?.split('/')[2] || 'No link'}
                                </h6>
                            </MenuTippy>
                            <CaretDownIcon className={cx('detail-tippy-caret-down')} />
                        </li>
                        <li className={cx('detail-tippy-container')}>
                            <p>official_forum_url</p>
                            <MenuTippy data={data.urls.official_forum_url}>
                                <h6 className={cx('detail-tippy')}>
                                    {data.urls.official_forum_url[0]?.split('/')[2] || 'No link'}
                                </h6>
                            </MenuTippy>
                            <CaretDownIcon className={cx('detail-tippy-caret-down')} />
                        </li>
                        <li>
                            <p>Total investment</p>
                            <p>${numberWithCommas(data.totalInvestment ? data.totalInvestment.toFixed(0) : 0)}</p>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default memo(TokenDetailEachCoin);
