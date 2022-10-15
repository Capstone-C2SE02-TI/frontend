import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';

function ChartCoinItem({ data , theme}) {

    return (
        <div style={{ height: '80px', width: '140px' }}>
            <Line
                data={{
                    labels: data.map((coin) => {
                        let date = new Date(Number(coin[0]));

                        let time =
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${
                                      date.getMinutes().toString().length === 1
                                          ? `0${date.getMinutes()} `
                                          : date.getMinutes()
                                  } PM`
                                : `${date.getHours()}:${
                                      date.getMinutes().toString().length === 1
                                          ? `0${date.getMinutes()}`
                                          : date.getMinutes()
                                  } AM`;
                        return time;
                    }),

                    datasets: [
                        {
                            label: 'hello',
                            data: data.map((coin) => {
                                return coin[1];
                            }),

                            fill: true,
                            backgroundColor: '#fff',
                            borderColor: theme,
                            showLine: true,
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

export default memo(ChartCoinItem);
