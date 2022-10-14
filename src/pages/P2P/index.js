import React,{ memo } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { HistoricalChart } from '~/configs/api';

const currency = 'INR';
const currentDay = 7;

function P2P({ data }) {
//    console.log(data);
    const [historicData, setHistoricData] = useState();
    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart('bitcoin', currentDay, currency));

        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [7]);

// console.log(historicData);
    return (
        <div style={{ height: '650px', padding: '16px' }}>
            <Line
                data={{
                    labels:
                        data.prices &&
                        Object.values(data.prices.day)?.map((coin) => {
                            let date = new Date(coin);
                            let time =
                                date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                            return currentDay === 1 ? time : date.toLocaleDateString();
                        }),

                    datasets: [
                        {
                            data: historicData?.map((coin) => coin[1]),
                            label: `Price ( Past ${currentDay} Days ) in ${currency}`,
                            fill: true,
                            backgroundColor: 'rgba(61, 55, 241, 0.2)',
                            borderColor: 'rgba(61, 55, 241, 0.2)',
                            showLine: false,
                        },
                    ],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1,
                        },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: false, // Hide legend
                    },
                    showLine: true,

                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                borderWidth: 1,
                                borderDash: [3],
                                circular: true,
                                drawBorder: false,
                                lineWidth: 1,
                                major: true,
                            },
                        },
                    },

                    // scales: {
                    //     y: {
                    //         display: false, // Hide Y axis labels
                    //     },
                    //     x: {
                    //         display: false, // Hide X axis labels
                    //     },
                    // },
                }}
            />
        </div>
    );
}

export default memo(P2P);
