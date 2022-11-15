import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { TI_ABI, TI_SMART_CONTRACT_ADDRESS, DEX_ABI, DEX_SMART_CONTRACT_ADDRESS } from '../../abi';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SwapToken.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import ConnectButton from './ConnectButton';
import Button from '~/components/Button';
import axios from 'axios';
import { log } from '@uniswap/smart-order-router';

const cx = classNames.bind(styles);

function SwapToken() {
    const [provider, setProvider] = useState(undefined);
    const [balance, setBalance] = useState('');
    const [ratio, setRatio] = useState('');
    const [signer, setSigner] = useState('');
    const [signerAddress, setSignerAddress] = useState('');
    const [ethValues, setEthValues] = useState(0);
    const [ethChange, setEthChange] = useState(0);
    // const [statusSwapToken, setStatusSwapToken] = useState('');

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);

    const loadBalance = async (signerAddress) => {
        const contractTi = await new ethers.Contract(TI_SMART_CONTRACT_ADDRESS, TI_ABI, provider);
        const balance = await contractTi.balanceOf(signerAddress);
        let convertBalance = await balance.toHexString(16);
        setBalance(parseInt(convertBalance, 16));
    };

    const loadRatio = async () => {
        const contractSwap = await new ethers.Contract(DEX_SMART_CONTRACT_ADDRESS, DEX_ABI, provider);
        const balance = await contractSwap.price();
        let convertBalance = balance.toHexString(16);
        setRatio(parseInt(convertBalance, 16) / 10 ** 18);
    };

    const getSigner = async (provider) => {
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer);
    };

    const getWalletAddress = () => {
        console.log("get Address");
        signer.getAddress().then((address) => {
            setSignerAddress(address);
        });
    };

    //side Effect handle get address
    useEffect(() => {
        if (signer) getWalletAddress();
    },[signer])


    //side Effect handle loadBalance and loadRatio when have signer address
    useEffect(() => {
        if (signerAddress) {
            //show balance in wallet
            loadBalance(signerAddress);

            //have ratio to convert eth to TI
            loadRatio();
        }
    }, [signerAddress]);


    const handleChange = (e) => {
        setEthValues(e.target.value);
        setEthChange(e.target.value / ratio);
    };

    const handleSwap = async () => {
        let ABI = ['function buy(uint amount)'];
        let ABITEST = ['function updatePrice(uint _newPrice)'];
    
        let iface = new ethers.utils.Interface(ABI);
        // let ifacetest = new ethers.utils.Interface(ABITEST);

        // console.log(ethers.utils.parseEther(ethValues).toString());
        let params = [
            {
                from: signerAddress,
                to: DEX_SMART_CONTRACT_ADDRESS,
                gas: '0x1FBD0', // 30400
                gasPrice: '0x1BF08EB000', // 10000000000000
                value: Number(ethValues * 10 ** 18).toString(16), // 2441406250
                data: iface.encodeFunctionData('buy', [ethChange]),
                // data: ifacetest.encodeFunctionData('updatePrice', [1]),
            },
        ];

        await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
            console.log({ txhash });
            checkTransactionConfirm(txhash).then((result) => {
                console.log({ resultTransaction: result });
                const handleRequestStatus = async () => {
                    const statusSwapToken = await axios.get(
                        `https://api-goerli.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=P4UEFZVG1N5ZYMPDKVQI7FFU7AZN742U3E`,
                    );
                    console.log({ statusSwapToken: statusSwapToken.data });
                };
                setTimeout(handleRequestStatus, 15000);
            });
        });
    };

    //!!check transaction when swapToken
    const checkTransactionConfirm = (txhash) => {
        let checkTransactionLop = () => {
            return window.ethereum
                .request({
                    method: 'eth_getTransactionReceipt',
                    params: [txhash],
                })
                .then((r) => {
                    if (r !== null) return 'comfirmned';
                    else return checkTransactionLop();
                });
        };
        return checkTransactionLop();
    };

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
                                isConnected={!!signer}
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
                                <input
                                    placeholder="0.0"
                                    type="number"
                                    name="eth-change"
                                    value={ethValues}
                                    onChange={handleChange}
                                />
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
                                <input
                                    placeholder="0.0"
                                    type="number"
                                    name="ti-change"
                                    value={ethValues / ratio || 0}
                                    onChange={() => {}}
                                />
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
