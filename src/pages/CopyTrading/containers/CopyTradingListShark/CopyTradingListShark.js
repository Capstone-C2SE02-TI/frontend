import React, { useState, useEffect } from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './CopyTradingListShark.module.scss';
import { Select } from 'antd';

const cx = classNames.bind(styles);


const CopyTradingListShark = ({ key, dataSharkFollowed }) => {
    // const [value, setValue] = useState(options[0].value)
    const [address, setAddress] = useState('') //shark address
    const [contractAdd, setContractAdd] = useState([]) //total of all token address
    const [tokenAdd, setTokenAdd] = useState([])  // address of each token
    const [symbolToken, setSymbolToken] = useState([]) //symbol of each token

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/shark/token_trading?address=0x72598E10eF4c7C0E651f1eA3CEEe74FCf0A76CF2`);
            const result = await response.json();
            setContractAdd(result)
            Object.keys(contractAdd).forEach(function (tokenAdd) {
                setTokenAdd(tokenAdd)
                setSymbolToken(contractAdd[tokenAdd].tokenSymbol)
            });
        }
        fetchData()
    }, []);

    // console.log("address", address)

    // const handleGetValue = (e) => {
    //     setValue(e.options.value)
    // }

    const handleGetAddress = () => {
        setAddress(dataSharkFollowed.walletAddress)
    }

    console.log("dataSharkFollowed", dataSharkFollowed)


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
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                // value: 'tokenAdd',
                                // label: 'symbolToken',
                            },
                        ]}
                    />
                </div>
            </td>
            <td className={cx('copy-trading--add')}>
                <button onClick={handleGetAddress}>Add to trade</button>
            </td>

        </tr>
    );
}

export default CopyTradingListShark;
