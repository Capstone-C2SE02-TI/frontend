import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoinsDiscover } from '~/modules/Discover/discoverSlice';

const useCoinsFetchInterval = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchCoinsDiscover());
            //fetch each 5 minutes 300000
        }, 300000);

        return () => clearInterval(interval);
    }, [dispatch]);
};

export default useCoinsFetchInterval;