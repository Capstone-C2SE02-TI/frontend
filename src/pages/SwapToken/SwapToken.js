import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { TI_ABI, TI_SMARTCONTRACTADDRESS, DEX_ABI, DEX_SMARTCONTRACTADDRESS } from '../../abi'
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SwapToken.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import ConnectButton from './ConnectButton';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SwapToken() {
    const [provider, setProvider] = useState(undefined)
    const [balance, setBalance] = useState("");
    const [ratio, setRatio] = useState("");
    const [signer, setSigner] = useState(undefined)
    const [signerAddress, setSignerAddress] = useState("")
    const [ethValues, setEthValues] = useState(0);
    const [ethChange, setEthChange] = useState(0);


    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum)
            await setProvider(provider)

        }
        onLoad()
    }, []);


    const loadBalance = async () => {
        const contractTi = await new ethers.Contract(TI_SMARTCONTRACTADDRESS, TI_ABI, provider)
        const balance = await contractTi.balanceOf(signerAddress);
        console.log(balance)
        let convertBalance = await balance.toHexString(16)
        setBalance(parseInt(convertBalance, 16))
    }

    const loadRatio = async () => {
        const contractSwap = await new ethers.Contract(DEX_SMARTCONTRACTADDRESS, DEX_ABI, provider)
        const balance = await contractSwap.price();
        let convertBalance = balance.toHexString(16)
        console.log(balance)
        setRatio(parseInt(convertBalance, 16) / 10 ** 18)
    }


    const handleSwap = async () => {
        let ABI = [
            "function buy(uint amount)"
        ]
        console.log(ethValues * 10 ** 18)
        console.log(ethChange)
        let iface = new ethers.utils.Interface(ABI)
        console.log(ethers.utils.parseEther(ethValues).toString())
        let params = [{
            "from": signerAddress,
            "to": DEX_SMARTCONTRACTADDRESS,
            "gas": "0x1FBD0", // 30400
            "gasPrice": "0x1BF08EB000", // 10000000000000
            "value": Number(ethValues * 10 ** 18).toString(16), // 2441406250
            "data": iface.encodeFunctionData("buy", [ethChange]),
        }]

        let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
            console.log(err)
        })


        console.log(ethChange)
    }
    const handleSwap2 = async () => {
        const contractSwap = await new ethers.Contract(DEX_SMARTCONTRACTADDRESS, DEX_ABI, provider)
        const options = { value: ethers.utils.parseEther("0.001") }
        const reciept = await contractSwap.buy(1, options);
        console.log("receipt", reciept)
    }
    const getSigner = async provider => {
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer)
    }

    const isConnected = () => signer !== undefined
    const getWalletAddress = () => {
        signer.getAddress()
            .then(address => {
                setSignerAddress(address)
            })
        loadBalance()
        loadRatio()
    }

    if (signer !== undefined) {
        getWalletAddress()
    }

    const handleChange = (e) => {
        setEthValues(e.target.value)
        setEthChange(e.target.value / ratio)
    }



    return (
        <section className={cx('container-swap')}>
            <div className={cx('swap-text')}>
                <h1>SWAP</h1>
            </div>

            <div className={cx('app-body')}>
                <div className={cx('swap-container')}>
                    <div className={cx('swap-header')}>
                        <span className={cx('swap-text__header')}>Swap</span>
                        <span className={cx('gear-container')}>
                            <ConnectButton
                                provider={provider}
                                isConnected={isConnected}
                                signerAddress={signerAddress}
                                getSigner={getSigner}
                            />
                        </span>
                    </div>
                    <div className={cx('swap-body')}>
                        <div className={cx('swap-body__text')}>
                            <p>You send</p>
                            <p>Balance: {balance}</p>
                        </div>
                        <div className={cx('swap-body__input')}>
                            <div>
                                <div className={cx('swap-body__logo')}>
                                    <Image width="30" height="30" src={images.etherium} alt="logo" />
                                    <p>ETH</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <input placeholder='0.0' type='number' name='eth-change' value={ethValues} onChange={handleChange} />
                            </div>
                            <div className={cx('icon-arrow-down')}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <div>
                                <div className={cx('swap-body__logo')}>
                                    <Image width="30" height="30" src={images.logo} alt="logo" />
                                    <p>TI</p>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                <input placeholder='0.0' type='number' name='ti-change' value={ethValues / ratio} />
                            </div>
                        </div>
                        <div className={cx('swap-footer')} onClick={handleSwap}>
                            <Button linearGradientPrimary>Swap now</Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SwapToken;
