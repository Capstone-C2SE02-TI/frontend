import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { HistoricalChart } from '~/configs/api';

const currency = 'INR';
const day = 7;

function ChartOverview() {
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
        <div style={{ height: '80px', width: '140px'}}>
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
                            label: 'hello',
                            data: historicData?.map((coin) => coin[1]),
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
                    plugins: {
                        legend: {
                          display: false
                        }
                    },
                    scales: {
                        y: {
                            display: false, // Hide Y axis labels
                        },
                        x: {
                            display: false, // Hide X axis labels
                        },
                    },
                }}
            />
        </div>
    );
}

export default ChartOverview;
