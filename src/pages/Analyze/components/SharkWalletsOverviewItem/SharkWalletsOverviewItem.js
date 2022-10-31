import { StarIcon } from '~/components/Icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sharkWalletSlide, { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { sharkListSelector } from '~/modules/SharkWallet/selector';
import numberWithCommas from '~/helpers/numberWithCommas';

function SharkWalletsOverviewItem() {
    const dispatch = useDispatch();

    const sharkCoin = useSelector(sharkListSelector);

    useEffect(() => {
        dispatch(fetchSharkWallet());
    }, [dispatch]);

    const handleSelectSharkAndSharkAddress = (sharkId, address) => {
        dispatch(sharkWalletSlide.actions.actionSelectedSharkWalletId(sharkId));
        dispatch(sharkWalletSlide.actions.actionSelectedSharkWalletAddress(address));
    };

    return (
        <>
            {sharkCoin.map((wallet) => (
                <tr key={wallet.id} onClick={() => handleSelectSharkAndSharkAddress(wallet.id, wallet.walletAddress)}>
                    <td>#Shark {wallet.id}</td>
                    <td>${numberWithCommas(wallet.totalAsset)}</td>
                    <td>{wallet.percent24h || '2.36%'}</td>
                    <td>
                        <StarIcon />
                    </td>
                </tr>
            ))}
        </>
    );
}

export default SharkWalletsOverviewItem;
