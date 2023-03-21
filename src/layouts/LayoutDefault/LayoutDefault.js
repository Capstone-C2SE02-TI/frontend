import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import ConnectButton from '~/pages/SwapToken/ConnectButton';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector, useDispatch } from 'react-redux';
import { convertUnixTime } from '~/helpers';
import { AvatarIcon, DolarIcon, MenuIcon, DiscoverIcon, PortfolioIcon } from '~/components/Icons';
import { ethers } from 'ethers';
import {
    TI_ABI,
    TI_SMART_CONTRACT_ADDRESS,
    FUND_SUBSCRIPTION_ABI,
    FUND_SUBSCRIPTION_ADDRESS,
    DEX_ABI,
    DEX_SMART_CONTRACT_ADDRESS,
} from '../../abi';
import HomeDashboardSlice from '~/modules/HomeDashboard/homeDashboardSlice';
import Tippy from '@tippyjs/react';
import authSlice, { fetchGetUserInfo, saveExpiredTime, saveUserPremium } from '~/modules/user/auth/authSlice';
import { userInfoSelector, smartContractInfoSelector, userIsPremiumSelector } from '~/modules/user/auth/selectors';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import MenuProfile from './components/MenuProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setInformationMetaMask } from '~/modules/MetaMask/metaMaskSlice';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';

const cx = classNames.bind(styles);

const userMenu = [
    {
        icon: <AvatarIcon />,
        title: 'Your Profile',
    },
    {
        icon: <DiscoverIcon />,
        title: 'Swap Token',
    },
    {
        icon: <DolarIcon />,
        title: 'Upgrade Premium',
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Portfolio',
    },
];

function LayoutDefault({ children }) {
    const [resize, setResize] = useState(false);
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState('');
    const [signerAddress, setSignerAddress] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [expriedTime, setExpriedTime] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId } = JSON.parse(localStorage.getItem('userInfo')) || '';
    const statusSidebarSelector = useSelector(SidebarSelector);
    const userInfo = useSelector(userInfoSelector);
    const smartContractInfo = useSelector(smartContractInfoSelector);
    const walletAddress = useSelector(getAddressMetaMask);

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        window.ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
           
            dispatch(setInformationMetaMask(accounts[0]));
        });

        async function isConnected() {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                dispatch(setInformationMetaMask(accounts[0]));
                console.log(`You're connected to: ${accounts[0]}`);
            } else {
                console.log('Metamask is not connected');
            }
        }
        isConnected();
        onLoad();
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

    const getSigner = async (provider) => {
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer);
    };

    useEffect(() => {
        const onLoad = async () => {
            const contractPremium = await new ethers.Contract(
                FUND_SUBSCRIPTION_ADDRESS,
                FUND_SUBSCRIPTION_ABI,
                provider,
            );
            const limmitedAccount = await contractPremium.getExpriedTime(smartContractInfo.walletAddress);
            const convertlimmitedAccount = await limmitedAccount.toHexString(16);
            const limmitedAccountTime = convertUnixTime(convertlimmitedAccount);
            const isPremiumUser = await contractPremium.isPremiumUser(smartContractInfo.walletAddress);
            if (isPremiumUser) {
                setExpriedTime(limmitedAccountTime);
                dispatch(saveExpiredTime(limmitedAccountTime));
            }
            dispatch(saveUserPremium(isPremiumUser));
        };
        onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [smartContractInfo.walletAddress]);

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
                setIsConnecting(true);

                const balance = await loadBalance(walletAddress);
                //have ratio to convert eth to TI
                const ratio = await loadRatio();
                //load premium price
                const premiumPrices = await loadPremiumPrices();
                dispatch(
                    authSlice.actions.saveSmartContractInfo({
                        walletAddress: walletAddress,
                        balance: balance,
                        ratio: ratio,
                        premiumPrices: premiumPrices,
                    }),
                );
            };
            loadCommon();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress]);

    const loadBalance = async (signerAddress) => {
        const contractTi = await new ethers.Contract(TI_SMART_CONTRACT_ADDRESS, TI_ABI, provider);
        const balance = await contractTi.balanceOf(signerAddress);
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

    const sidebarClassName = cx({
        'sidebar-wrapper': true,
        'hide-sidebar': resize || !statusSidebarSelector,
    });

    const containerClassName = cx('container', {
        mr: resize || !statusSidebarSelector,
    });
    const toggleMenu = () => {
        dispatch(HomeDashboardSlice.actions.actionSidebar());
    };

    useEffect(() => {
        const handleResize = (e) => {
            if (window.innerWidth < 1200) {
                setResize(true);
            } else setResize(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const defaultPropsTippy = {
        animateFill: false,
        animation: 'scale',
        interactive: true,
        interactiveBorder: 10,
        theme: 'light',
        placement: 'bottom',
        delay: [1, 200],
    };

    const handleOnChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Your Profile':
                navigate('/profile');
                break;
            case 'Upgrade Premium':
                navigate('/upgrade');
                break;
            case 'Swap Token':
                navigate('/swap-token');
                break;
            case 'Portfolio':
                navigate('/portfolio-shark-follow');
                break;
            default:
                break;
        }
    };

    const renderConnectMetaMask = () => {
        if (typeof walletAddress === 'undefined' || walletAddress === '')
            return (
                <ConnectButton
                    provider={provider}
                    isConnected={isConnecting}
                    signerAddress={smartContractInfo.walletAddress ? smartContractInfo.walletAddress : signerAddress}
                    getSigner={getSigner}
                />
            );

        return userIsPremium ? (
            <button className={cx('btn-connection')}>Premium!</button>
        ) : (
            <button className={cx('btn-connection')} onClick={() => navigate('/upgrade')}>
                Click Upgrade now!
            </button>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={sidebarClassName}>
                <SideBar />
            </div>
            <div className={containerClassName}>
                <div className={cx('header-menu')}>
                    <Tippy content="Menu" {...defaultPropsTippy}>
                        <button onClick={toggleMenu} className={cx('icon-menu')}>
                            <MenuIcon />
                        </button>
                    </Tippy>

                    {
                        <div className={cx('user-profile__right')}>
                            {renderConnectMetaMask()}
                            <MenuProfile
                                items={userMenu}
                                onChange={handleOnChange}
                                userInfo={userInfo}
                                limmitedAccountTime={expriedTime}
                            >
                                <div className={cx('user-profile')}>
                                    {userInfo ? (
                                        <img
                                            src={userInfo.avatar || images.userAvatar}
                                            alt="avatar"
                                            width={' 50px '}
                                            className={cx('user-profile-avatar')}
                                        />
                                    ) : (
                                        <Skeleton circle width={50} height={50} />
                                    )}
                                    <div className={cx('user-profile__text')}>
                                        <span>Hi, </span>
                                        <p>{walletAddress ? walletAddress.slice(0, 10) + '...' : '...'}</p>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 24 24"
                                            className="text-gray-400 text-14"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </MenuProfile>
                        </div>
                    }
                </div>
                {children}
            </div>
        </div>
    );
}

export default LayoutDefault;
