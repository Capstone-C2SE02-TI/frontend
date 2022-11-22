import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import ConnectButton from '~/pages/SwapToken/ConnectButton'
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import { useSelector, useDispatch } from 'react-redux';
import { AvatarIcon, DolarIcon, MenuIcon, DiscoverIcon } from '~/components/Icons';
import { ethers } from 'ethers';
import { TI_ABI, TI_SMART_CONTRACT_ADDRESS, DEX_ABI, DEX_SMART_CONTRACT_ADDRESS } from '../../abi';
import HomeDashboardSlice from '~/modules/HomeDashboard/homeDashboardSlice';
import Tippy from '@tippyjs/react';
import authSlice, { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { userInfoSelector, walletAddressSelector } from '~/modules/user/auth/selectors';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import MenuProfile from './components/MenuProfile';

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
];


function LayoutDefault({ children }) {

    const statusSidebarSelector = useSelector(SidebarSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = JSON.parse(localStorage.getItem('userInfo')) || '';
    const userInfo = useSelector(userInfoSelector);
    const walletAddress = useSelector(walletAddressSelector)
    const [resize, setResize] = useState(false)
    //connect wallet
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState('');
    const [signerAddress, setSignerAddress] = useState('');

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await setProvider(provider);
        };
        onLoad();
    }, []);

    //side Effect handle loadBalance and loadRatio when have signer address
    useEffect(() => {

        if (walletAddress) {
            //show balance in wallet
            loadBalance(walletAddress);
            //have ratio to convert eth to TI
            loadRatio();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress]);

    const loadBalance = async (signerAddress) => {
        const contractTi = await new ethers.Contract(TI_SMART_CONTRACT_ADDRESS, TI_ABI, provider);
        const balance = await contractTi.balanceOf(signerAddress);
        let convertBalance = await balance.toHexString(16);
        dispatch(authSlice.actions.saveBalance(parseInt(convertBalance, 16)))

    };

    const loadRatio = async () => {
        const contractSwap = await new ethers.Contract(DEX_SMART_CONTRACT_ADDRESS, DEX_ABI, provider);
        const balance = await contractSwap.price();
        let convertBalance = balance.toHexString(16);
        dispatch(authSlice.actions.saveRatio(parseInt(convertBalance, 16) / 10 ** 18))

    };

    const getSigner = async (provider) => {
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer);
    };



    const getWalletAddress = () => {
        signer.getAddress().then((address) => {
            setSignerAddress(address);
            dispatch(authSlice.actions.saveWalletAddress(address))
        });
    };

    useEffect(() => {
        if (signer) getWalletAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer])

    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

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
                setResize(true)
            }
            else setResize(false)
        };

        window.addEventListener('resize', handleResize);

        return () =>
            window.removeEventListener('resize', handleResize);

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

    //

    // const connectWallet = () => {
    //     navigate('/buy-token');
    // };


    const handleOnChange = (menuItem) => {
        console.log('menuItem', menuItem);
        switch (menuItem.title) {
            case 'Your Profile':
                navigate('/profile');
                break;
            case 'Upgrade Premium':
                navigate('/buy-token');
                break;
            case 'Swap Token':
                navigate('/swap-token')
                break;
            default:
                break;
        }

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

                    {userId ? (
                        <div className={cx('user-profile__right')}>
                            <ConnectButton
                                provider={provider}
                                isConnected={!!signer}
                                signerAddress={walletAddress ? walletAddress : signerAddress}
                                getSigner={getSigner}
                            />
                            <MenuProfile items={userMenu} onChange={handleOnChange} userInfo={userInfo}>
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
                                        <p>{userInfo.fullName || userInfo.username || 'Investor'}</p>
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
                    ) : (
                        <div>
                            <Button outline onClick={() => navigate('/sign-in')}>
                                Sign In
                            </Button>
                            <Button primary onClick={() => navigate('/sign-up')}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default LayoutDefault;
