import React, { useState, useEffect } from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './CopyTradingListShark.module.scss';
import Select from 'react-select'

const cx = classNames.bind(styles);

const options = [
    { value: '0xDA01d680F67423C2D6bE049536E19f788d44EBD2', label: 'WETH/TI' },
    { value: 'strawberry', label: 'WETH/ETH' },
    { value: 'vanilla', label: 'WETH/USDT' }
]

const CopyTradingListShark = ({ key, dataSharkFollowed }) => {
    const [value, setValue] = useState(options[0].value)
    const [address, setAddress] = useState('')
    const [contractAdd, setContractAdd] = useState([])

    useEffect(() => {
        async function fetchData() {
            const promises = [];
            for (let i = 0; i < dataSharkFollowed.length; i++) {
                const response = await fetch(`/shark/token_trading?address=${dataSharkFollowed[i].walletAddress}`);
                const result = await response.json();
                promises.push({ sharkId: dataSharkFollowed[i].sharkId, data: result.TXs });
            }
            const results = await Promise.all(promises);
            setContractAdd(results);
        }
        fetchData();
    }, []);

    // const handleGetValue = (e) => {
    //     setValue(e.options.value)
    // }

    const handleGetAddress = () => {
        setAddress(dataSharkFollowed.walletAddress)
        console.log(address)
    }

    return (
        <tr className={cx('copy-trading--line')}>
            <td>Shark #{dataSharkFollowed.sharkId}</td>
            <td>
                $
                {millify(dataSharkFollowed.totalAssets, {
                    precision: 3,
                    decimalSeparator: ',',
                })}
            </td>
            {
                dataSharkFollowed.percent24h.toFixed(3) > 0 ?
                    <td className={cx("increase")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td> :
                    <td className={cx("decrease")}>{dataSharkFollowed.percent24h.toFixed(3) + '%' || '0%'}</td>
            }
            <td className={cx('copy-trading--pair')}>
                <div className={cx('pair-layout')}>
                    <Select defaultValue={options[0].value} options={options} />
                </div>
            </td>
            <td className={cx('copy-trading--add')}>
                <button onClick={handleGetAddress}>Add to trade</button>
            </td>

        </tr>
    );
}

export default CopyTradingListShark;
