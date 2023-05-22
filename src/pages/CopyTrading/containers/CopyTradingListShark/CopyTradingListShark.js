import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './CopyTradingListShark.module.scss';
import { Select } from 'antd';
import { toast } from 'react-toastify';
import { InputNumber } from 'antd';
import Modal from '~/components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

const CopyTradingListShark = ({ key, dataSharkFollowed }) => {

    const [address, setAddress] = useState('') //shark address
    const [contractAdd, setContractAdd] = useState([]) //total of all token address
    const [tokenInfo, settokenInfo] = useState([]) //
    const [valuetoken, setvaluetoken] = useState('')
    const [isOpenModalAuto, setIsOpenModalAuto] = useState(false);
    const [amoutData, setAmountData] = useState('');

    const userAddress = localStorage.getItem("eth_address");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/shark/token_trading?address=0x72598E10eF4c7C0E651f1eA3CEEe74FCf0A76CF2`);
            const result = await response.json();
            setContractAdd(result)
            Object.keys(result).forEach(function (token) {
                let tokenTmp = tokenInfo;
                tokenTmp.push({
                    "symbol": "WETH/" + result[token].tokenSymbol,
                    "address": token
                })
                settokenInfo(tokenTmp)
            });
        }
        fetchData()
    }, []);

    console.log("toToken", valuetoken)
    console.log("sharkAddress", address)
    console.log("userAddress", userAddress)
    console.log("ethAmount", amoutData)

    const onRequestClose = () => {
        setIsOpenModalAuto(false);
    };

    // console.log(dataSharkFollowed.walletAddress)

    const onChange = (value) => {
        setAmountData(value);
    };
    const handleGetAddress = async () => {
        // setAddress(dataSharkFollowed.walletAddress)
        try {
            toast.loading('Get input data loading ...');

            const response = await fetch(`http://localhost:4000/trading/auto`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "fromToken": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
                        "toToken": valuetoken,
                        "sharkAddress": dataSharkFollowed.walletAddress,
                        "userAddress": userAddress,
                        "ethAmount": amoutData
                    },
                )
            });
            const result = await response.json();
            toast.dismiss();
            if (result.message == "save-successful") {
                toast.success('Add successfully');
                navigate('/list-shark-trading')
            }
            console.log("result", result)
            // if (result.input) {
            //     setInputData(result.input);
            // } else {
            //     toast.warning(result.message);
            // }
        } catch (err) {
            // toast.error(err)
            console.log(err);
        }
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
                    <Select
                        onChange={(value) => {
                            setvaluetoken(value)
                        }}
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={
                            tokenInfo.map((token) => {
                                return {
                                    value: token.address,
                                    label: token.symbol,
                                }
                            })
                        }
                    />
                </div>
            </td>
            <td className={cx('copy-trading--add')}>
                <button onClick={() => setIsOpenModalAuto(true)} >Add to trade</button>
            </td>
            <Modal isOpen={isOpenModalAuto} onRequestClose={onRequestClose}>
                <div className={cx('content')}>
                    <div className={cx('title')}>Amount</div>
                    <h4 className={cx('sub-title')}>Send to fund</h4>
                    <p className={cx('desc')}>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        <span> Amount you want send to fund for trading</span>
                    </p>
                    <div>
                        <InputNumber
                            defaultValue={0}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={onChange}
                            className={cx('input-amount')}
                        />
                    </div>
                    <div className={cx('actions')}>
                        <Button
                            primary
                            small
                            onClick={() => {
                                handleGetAddress()
                                setIsOpenModalAuto(false);
                            }}
                        >
                            OK
                        </Button>
                        <Button outlineBrow small onClick={() => setIsOpenModalAuto(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

        </tr>

    );
}

export default CopyTradingListShark;
