import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import SideBar from './components/SideBar';
import { SidebarSelector } from '~/modules/HomeDashboard/selector';
import Modal from '~/components/Modal/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AvatarIcon, DolarIcon, MenuIcon, DiscoverIcon } from '~/components/Icons';
import { InputNumber, Space } from 'antd';
import { saveUserBuyingMetadata } from '~/modules/user/auth/authSlice';
import { ethers } from 'ethers';
import ModalNotify from '~/components/ModalNotify/ModalNotify';
import { TransactionResponse } from '~/configs/api';
import { MIDDLE_CONTRACT_ABI, MIDDLE_CONTRACT_ADDRESS } from '~/abi';
import Button from '~/components/Button/Button';
import HomeDashboardSlice from '~/modules/HomeDashboard/homeDashboardSlice';
import Tippy from '@tippyjs/react';
import { fetchGetAllUser, saveSmartContractInfo } from '~/modules/user/auth/authSlice';
import { userBuyingMetadataSelector, userInfoSelector, userIsPremiumSelector } from '~/modules/user/auth/selectors';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import MenuProfile from './components/MenuProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { setInformationMetaMask } from '~/modules/MetaMask/metaMaskSlice';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import { useCallback } from 'react';

const cx = classNames.bind(styles);

const userMenu = [
  // {
  //     icon: <AvatarIcon />,
  //     title: 'Your Profile',
  // },
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
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Setting Trading',
  },
];

function LayoutDefault({ children }) {

  const [resize, setResize] = useState(false);
  const [expiredTime, setExpiredTime] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isOpenSendFund, setIsOpenSendFund] = useState(false);
  const [amountData, setAmountData] = useState(0);
  const [openModalSucceed, setOpenModalSucceed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsPremium = useSelector(userIsPremiumSelector);
  const statusSidebarSelector = useSelector(SidebarSelector);
  const userInfo = useSelector(userInfoSelector);
  const walletAddress = useSelector(getAddressMetaMask);
  const userBuyingMetadata = useSelector(userBuyingMetadataSelector);

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
    dispatch(fetchGetAllUser());
  }, [dispatch]);

  const [withCurrent, setWidthCurrent] = useState(window.innerWidth);
  useEffect(() => {
    if (withCurrent < 1200) {
      setWidthCurrent(withCurrent);
      setResize(true);
    }

    const handleResize = (e) => {
      if (window.innerWidth < 1200) {
        setResize(true);
      } else setResize(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [withCurrent]);

  const defaultPropsTippy = {
    animateFill: false,
    animation: 'scale',
    interactive: true,
    interactiveBorder: 10,
    theme: 'light',
    placement: 'bottom',
    delay: [1, 200],
  };

  const onRequestClose = () => {
    setIsOpenSendFund(false);
  };

  const onChange = (value) => {
    setAmountData(value);
  };

  const handleSendAmount = async () => {
    const ethAmount = amountData.toString();

    let params = [
      {
        from: walletAddress,
        to: MIDDLE_CONTRACT_ADDRESS,
        value: ethers.utils.parseEther(ethAmount)._hex,
        // value: ethAmount
      },
    ];
    await window.ethereum.request({ method: 'eth_sendTransaction', params }).then((txhash) => {
      toast.loading('Processing send to fund...');

      checkTransactionConfirm(txhash).then((result) => {
        if (result) {
          toast.dismiss();
          const handleRequestStatus = async () => {
            const approveTokenStatus = await axios.get(TransactionResponse(txhash));
            setIsOpenSendFund(false);
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const contractMiddle = await new ethers.Contract(MIDDLE_CONTRACT_ADDRESS, MIDDLE_CONTRACT_ABI, provider);

            const userBuyingMetadata = await contractMiddle.userBuyingMetadata(walletAddress);
            const userBuyingMetadataTransfer = parseInt(userBuyingMetadata.toHexString(16), 16) / 10 ** 18;
            dispatch(saveUserBuyingMetadata(userBuyingMetadataTransfer));

            if (approveTokenStatus.data.result.isError === '0') {
              setOpenModalSucceed(true);
            } else {
              toast.error('Send amount failed');
            }
          };
          setTimeout(handleRequestStatus, 1000);
        }
      });
    });
  };

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
      case 'Setting Trading':
        navigate('/setting/trading');
        break;
      default:
        break;
    }
  };

  const handleDisconnect = () => {
    setIsConnecting(false);
    dispatch(saveSmartContractInfo({}));
    dispatch(setInformationMetaMask(''));
  };

  const handleSetIsConnecting = useCallback((status) => {
    setIsConnecting(status);
  }, []);

  const handleSetExpiredTime = useCallback((expiredTime) => {
    setExpiredTime(expiredTime);
  }, []);

  return (

    <div className={cx('wrapper')}>
      <div className={sidebarClassName}>
        <SideBar />
      </div>
      <div className={containerClassName}>
        <div className={cx('header-menu')}>
          <div className={cx('header-menu-tippy')}>
            <Tippy content="Menu" {...defaultPropsTippy}>
              <button onClick={toggleMenu} className={cx('icon-menu')}>
                <MenuIcon />
              </button>
            </Tippy>
          </div>

          {
            <div className={cx('user-profile__right')}>
              <Button className={cx("send-fund")} linearGradientPrimary onClick={() => setIsOpenSendFund(true)}>Send fund</Button>
              {userIsPremium && userBuyingMetadata && <div className={cx('user-profile__box-amount')} onClick={() => navigate('/copy-overview')}>
                <img className={cx('user-profile__right-coin')} src='https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' alt='' />
                <span className={cx('user-profile__right-amount')}>BNB {userBuyingMetadata.toFixed(3)}</span>
              </div>}
              <ConnectWallet
                handleSetExpiredTime={handleSetExpiredTime}
                handleSetIsConnecting={handleSetIsConnecting}
                isConnecting={isConnecting}
              />
              {
                <MenuProfile
                  items={userMenu}
                  onChange={handleOnChange}
                  userInfo={userInfo}
                  limmitedAccountTime={expiredTime}
                  handleDisconnect={handleDisconnect}
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
              }
            </div>
          }
        </div>
        {children}
      </div>
      <Modal isOpen={isOpenSendFund} onRequestClose={onRequestClose}>
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
                handleSendAmount();
                setIsOpenSendFund(false);
              }}
            >
              OK
            </Button>
            <Button outlineBrow small onClick={() => setIsOpenSendFund(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {openModalSucceed && (
        <ModalNotify
          typeSuccess={true}
          icon={<FontAwesomeIcon icon={faCheck} />}
          isOpen={openModalSucceed}
          title={'Send successfully '}
          description="Send fund successfully"
          onRequestClose={() => {
            setOpenModalSucceed(false);
            // navigate('/setting/trading');
          }}
        />
      )}
    </div>
  );
}

export default LayoutDefault;
