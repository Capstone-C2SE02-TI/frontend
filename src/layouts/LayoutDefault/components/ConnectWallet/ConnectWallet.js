import { memo } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import styles from './ConnectWallet.module.scss';
import ConnectButton from '~/pages/SwapToken/ConnectButton';
import { useSelector, useDispatch } from 'react-redux';
import { convertUnixTime } from '~/helpers';
import { ethers } from 'ethers';

import {
  fetchGetUserInfo,
  fetchGetUserSignup,
  saveExpiredTime,
  saveSmartContractInfo,
  saveUserPremium,
} from '~/modules/user/auth/authSlice';
import { listUserSelector, userIsPremiumSelector } from '~/modules/user/auth/selectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setInformationMetaMask } from '~/modules/MetaMask/metaMaskSlice';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { DEX_ABI, DEX_SMART_CONTRACT_ADDRESS, FUND_SUBSCRIPTION_ABI, FUND_SUBSCRIPTION_ADDRESS, TI_ABI, TI_SMART_CONTRACT_ADDRESS } from '~/abi';
const DEFAULT_F = () => { }
const cx = classNames.bind(styles);

function ConnectWallet({ handleSetIsConnecting, isConnecting, handleSetExpiredTime = DEFAULT_F }) {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState('');
  const [signerAddress, setSignerAddress] = useState('');
  const [isNotExistMeta, setIsNotExistMeta] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = JSON.parse(localStorage.getItem('userInfo')) || '';
  const walletAddress = useSelector(getAddressMetaMask);
  const listUser = useSelector(listUserSelector);

  useEffect(() => {
    const eth_address = localStorage.getItem('eth_address');
    if (eth_address) {
      handleSetIsConnecting(true);
    }
    if (!isNotExistMeta) {
      if (isConnecting) handleGetStatusMeTamask();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotExistMeta, isConnecting]);

  const handleGetStatusMeTamask = useCallback(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      await setProvider(provider);
      window.ethereum.on('accountsChanged', function (accounts) {
        if (!accounts[0]) {
          dispatch(saveSmartContractInfo({}));
          dispatch(setInformationMetaMask(''));
          localStorage.removeItem('eth_address');
        } else {
          localStorage.setItem('eth_address', accounts[0]);
          dispatch(setInformationMetaMask(accounts[0]));
        }
      });
      getSigner(provider);
    };
    async function isConnected() {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        dispatch(setInformationMetaMask(accounts[0]));
      } else {
      }
    }
    isConnected();
    onLoad();
  }, [dispatch]);

  useEffect(() => {
    if (walletAddress) {
      dispatch(fetchGetUserInfo(walletAddress));
    }
  }, [dispatch, walletAddress]);

  const getSigner = async (provider) => {
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    setSigner(signer);
  };

  useEffect(() => {
    if (walletAddress) {
      const handleSignup = async () => {
        const isExistWalletAddress = _.some(listUser, { walletAddress });
        if (!isExistWalletAddress) {
          dispatch(
            fetchGetUserSignup({
              walletAddress,
            }),
          );
        }
      };

      const onLoad = async () => {
        setLoading(true);
        const contractPremium = await new ethers.Contract(FUND_SUBSCRIPTION_ADDRESS, FUND_SUBSCRIPTION_ABI, provider);
        console.log(walletAddress);
        const limitedAccount = await contractPremium.getExpriedTime(walletAddress);
        console.log(limitedAccount);
        const convertLimitedAccount = await limitedAccount.toHexString(16);
        const limitedAccountTime = convertUnixTime(convertLimitedAccount);
        const isPremiumUser = await contractPremium.isPremiumUser(walletAddress);
        if (isPremiumUser) {
          handleSetExpiredTime(limitedAccountTime);
          dispatch(saveExpiredTime(limitedAccountTime));
        }
        dispatch(saveUserPremium(isPremiumUser));
        setLoading(false);
      };
      onLoad();
      handleSignup();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  useEffect(() => {
    if (signer) getWalletAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  const getWalletAddress = () => {
    signer.getAddress().then((address) => {
      setSignerAddress(address);
    });
  };
  const userIsPremium = useSelector(userIsPremiumSelector);

  useEffect(() => {
    if (walletAddress) {
      //show balance in wallet
      const loadCommon = async () => {
        const balance = await loadBalance(walletAddress);
        //have ratio to convert eth to TI
        const ratio = await loadRatio();
        //load premium price
        const premiumPrices = await loadPremiumPrices();
        dispatch(
          saveSmartContractInfo({
            walletAddress: walletAddress,
            balance: balance,
            ratio: ratio,
            premiumPrices: premiumPrices,
          }),
        );
        handleSetIsConnecting(false);
      };
      loadCommon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const loadBalance = async (signerAddress) => {
    const contractTi = await new ethers.Contract(TI_SMART_CONTRACT_ADDRESS, TI_ABI, provider);
    const balance = await contractTi.balanceOf(signerAddress);
    console.log({ balance });
    let convertBalance = await balance.toHexString(16);
    return parseInt(convertBalance, 16);
  };

  const loadRatio = async () => {
    const contractSwap = await new ethers.Contract(DEX_SMART_CONTRACT_ADDRESS, DEX_ABI, provider);
    const balance = await contractSwap.price();
    let convertBalance = balance.toHexString(16);
    return parseInt(convertBalance, 16) / 10 ** 18;
  };

  const loadPremiumPrices = async () => {
    const contractPremium = await new ethers.Contract(FUND_SUBSCRIPTION_ADDRESS, FUND_SUBSCRIPTION_ABI, provider);
    const premium1Month = await contractPremium.premiumLevel(1);
    const premium6Month = await contractPremium.premiumLevel(2);
    const premium1Year = await contractPremium.premiumLevel(3);
    return [
      { price: premium1Month[1], time: 1 },
      { price: premium6Month[1], time: 6 },
      { price: premium1Year[1], time: 12 },
    ];
  };

  const handleSetStatusMeta = useCallback((status) => {
    setIsNotExistMeta(status);
  }, []);

  const renderConnectMetaMask = useMemo(() => {
    if (typeof walletAddress === 'undefined' || walletAddress === '')
      return (
        <ConnectButton
          provider={provider}
          signerAddress={walletAddress ? walletAddress : signerAddress}
          getSigner={getSigner}
          setIsNotExistMeta={handleSetStatusMeta}
          isNotExistMeta={isNotExistMeta}
          handleSetIsConnecting={handleSetIsConnecting}
          onGetStatusMeTamask={handleGetStatusMeTamask}
        />
      );
    if (walletAddress) {
      if (loading) {
        return (
          <div className={cx('loader')}>
            <div className={cx('scanner')}>
              <span>Connecting...</span>
            </div>
          </div>
        );
      } else {
        return userIsPremium ? (
          <button className={cx('btn-connection')}>Premium!</button>
        ) : (
          <button className={cx('btn-connection')} onClick={() => navigate('/upgrade')}>
            Click Upgrade now!
          </button>
        );
      }
    }
  }, [
    walletAddress,
    provider,
    signerAddress,
    handleSetStatusMeta,
    isNotExistMeta,
    handleSetIsConnecting,
    handleGetStatusMeTamask,
    loading,
    userIsPremium,
    navigate,
  ]);

  return renderConnectMetaMask;
}

export default memo(ConnectWallet);