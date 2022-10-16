import React, { memo } from 'react';
import { useCallback } from 'react';
import { Line } from 'react-chartjs-2';

function ChartCoinDetail({ data, typeFilter = 'day', time, symbol }) {
    const getLabelsCoinsDetailSorted = useCallback(() => {
        return data.prices[typeFilter]
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                let date = new Date(Number(coin[0]));
                let time =
                    date.getHours() > 12
                        ? `${date.getHours() - 12}:${
                              date.getMinutes().toString().length === 1 ? `0${date.getMinutes()} ` : date.getMinutes()
                          } PM`
                        : `${date.getHours()}:${
                              date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
                          } AM`;
                return typeFilter === 'day' ? time : date.toLocaleDateString();
            });
    }, [data.prices, typeFilter]);

    const getDataCoinsDetailSorted = useCallback(() => {
        return data.prices[typeFilter]
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                return coin[1];
            });
    }, [data.prices, typeFilter]);

    return (
        <div>
            <Line
                data={{
                    labels: getLabelsCoinsDetailSorted(),

                    datasets: [
                        {
                            label: `Price (${time}) in ${symbol} `,
                            data: getDataCoinsDetailSorted(),
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
                }}
            />
        </div>
    );
}

export default memo(ChartCoinDetail);
