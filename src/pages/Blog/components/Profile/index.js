import { useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { setInformationMetaMask } from '~/modules/MetaMask/metaMaskSlice';
import ConnectWallet from '~/layouts/LayoutDefault/components/ConnectWallet/ConnectWallet';
import Image from '~/components/Image/Image';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';

const cx = classNames.bind(styles);

function Profile() {
  const dispatch = useDispatch();
  const walletAddress = useSelector(getAddressMetaMask);
  const userInfo = useSelector(userInfoSelector);
  const userWalletAddress = localStorage.getItem('eth_address');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGetStatusMeTamask = useCallback(() => {
    async function isConnected() {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        dispatch(setInformationMetaMask(accounts[0]));
      }
    }
    isConnected();
  }, [dispatch]);

  const handleSetIsConnecting = useCallback((status) => {
    setIsConnecting(status);
  }, []);

  useEffect(() => {
    handleGetStatusMeTamask();
    dispatch(fetchGetUserInfo(userWalletAddress));
  }, []);

  return (
    <div className={cx('profile')}>
      {walletAddress === '' ? (
        <ConnectWallet handleSetIsConnecting={handleSetIsConnecting} isConnecting={isConnecting} />
      ) : (
        <Fragment>
          <img className={cx('profile-image')} src={userInfo.avatar} alt="logo" />
          <div className={cx('profile-name')}>
            <h5>{walletAddress.slice(0, 10) + '...'}</h5>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Profile;
