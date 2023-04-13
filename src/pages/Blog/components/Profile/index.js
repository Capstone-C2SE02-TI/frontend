import { useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressMetaMask } from '~/modules/MetaMask/selector';
import { setInformationMetaMask } from '~/modules/MetaMask/metaMaskSlice';
import ConnectWallet from '~/layouts/LayoutDefault/components/ConnectWallet/ConnectWallet';
import DefaultAvatar from '~/assets/images/DefaultAvatar.png';
import Image from '~/components/Image/Image';
import classNames from 'classnames/bind';
import styles from '../../Blog.module.scss';

const cx = classNames.bind(styles);

function Profile() {
  const dispatch = useDispatch();
  const walletAddress = useSelector(getAddressMetaMask);
  const [isConnecting, setIsConnecting] = useState(false);

  console.log(walletAddress);

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
  }, []);

  return (
    <div className={cx('profile')}>
      {walletAddress === '' ? (
        <ConnectWallet handleSetIsConnecting={handleSetIsConnecting} isConnecting={isConnecting} />
      ) : (
        <Fragment>
          <Image className={cx('profile-image')} src={DefaultAvatar} alt="logo" />
          <div className={cx('profile-name')}>
            <h5>{walletAddress}</h5>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Profile;
