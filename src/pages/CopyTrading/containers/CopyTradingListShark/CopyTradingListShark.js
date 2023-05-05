import React, { useState } from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './CopyTradingListShark.module.scss';
import Select from 'react-select'

const cx = classNames.bind(styles);

const CopyTradingListShark = ({ x, dataSharkFollowed }) => {
    const getInitialState = () => {
        const value = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";
        return value;
    };

    console.log("dataSharkFollowed", dataSharkFollowed)
    const [value, setValue] = useState(getInitialState);
    const [address, setAddress] = useState([])

    const handleGetAddress = () => {
        setAddress(dataSharkFollowed.walletAddress)
        console.log(address)
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <tr className={cx('copy-trading--line')}>
            <td>Shark #{dataSharkFollowed.sharkId}</td>
            {/* <td >{dataSharkFollowed.walletAddress}</td> */}
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
                <div className={cx('pair-box')}>
                    <Select className="basic-single" classNamePrefix="select"/>
                </div>
            </td>
            <td className={cx('copy-trading--add')}>
                <button onClick={handleGetAddress}>Add to trade</button>
            </td>

        </tr>
    );
}

export default CopyTradingListShark;
