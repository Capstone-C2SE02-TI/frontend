import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { HistoricalChart } from '~/configs/api';

const currency = 'INR';
const day = 7;

function P2P() {
    const [historicData, setHistoricData] = useState();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart('bitcoin', day, currency));

        setHistoricData(data.prices);
    };

    console.log({ historicData });

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);
// const handleChange = (value) => {
//     console.log(value);
// };
    return (
        <div style={{ height: '650px', padding: '16px' }}>
            <Line
                // height={'900px'}
                data={{
                    labels: historicData?.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;

                        return day === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                        {
                            data: historicData?.map((coin) => coin[1]),
                            label: `Price ( Past ${day} Days ) in ${currency}`,
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
                                major:true
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

export default P2P;
