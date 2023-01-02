import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoinsDiscover, fetchListTagsName, fetchTrendingCoins } from '~/modules/Discover/discoverSlice';

export const useFetchCoinsDiscoverInterval = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchCoinsDiscover());
            //fetch each 2 minutes
        }, 3 * 60 * 1000);

        return () => clearInterval(interval);
    }, [dispatch]);
};


export const useFetchTrendingCoinsInterval = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchTrendingCoins());
            //fetch each 1 minutes
        }, 3 * 60 * 1000);

        return () => clearInterval(interval);
    }, [dispatch]);
};



export const useFetchListTagsNameInterval = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchListTagsName());
            //fetch each 1 minutes
        }, 3 * 60 * 1000);

        return () => clearInterval(interval);
    }, [dispatch]);
};


