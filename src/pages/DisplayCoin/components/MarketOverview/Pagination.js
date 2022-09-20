import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './MarketOverview.module.scss';
import CoinItem from './CoinItem';
import * as request from '~/utils/httpRequest';
const cx = classNames.bind(styles);

function PaginationCoin() {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    useEffect(() => {
        const fetchCoin = async () => {
            // setLoading(true);
            try {
                const response = await request.get('http://localhost:4000/display/coins', {
                    params: {
                        page: currentPage,
                    },
                });
                console.log(response.data);
                setCoins(response.data.coins);
                setTotalPage(response.data.totalPage);
            } catch (error) {
                console.warn(error);
            }
        };
        fetchCoin();
    }, []);
    return (
        <>
            {coins.map((coin, index) => (
                <CoinItem key={index} index={index} coin={coin}/>
            ))}

        </>
    );
}

export default PaginationCoin;
