import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';


function ChartCoinDetail({ data, typeFilter = 'day' }) {

    console.log(data);
    console.log(typeFilter);
    return (
        <div>
            <Line
                data={{
                    labels: data.prices[typeFilter].map((coin) => {
                        let date = new Date(Number(coin[0]));

                        let time =
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${
                                      date.getMinutes().toString().length === 1
                                          ? `hello ${date.getMinutes()} `
                                          : date.getMinutes()
                                  } PM`
                                : `${date.getHours()}:${
                                      date.getMinutes().toString().length === 1
                                          ? `0${date.getMinutes()}`
                                          : date.getMinutes()
                                  } AM`;
                        return typeFilter === 'day' ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                        {
                            label: 'hello',
                            data: data.prices[typeFilter].map((coin) => {
                                return coin[1];
                            }),

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
                            display: false,
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

export default memo(ChartCoinDetail);
