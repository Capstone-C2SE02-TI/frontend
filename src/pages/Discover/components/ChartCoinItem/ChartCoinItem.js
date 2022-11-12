import React, { memo } from 'react';
import { useCallback } from 'react';
import { Line } from 'react-chartjs-2';

function ChartCoinItem({ data , theme, labelTitle = 'Last 1 day', symbol}) {

    const getLabelsCoinsDetailSorted = useCallback(() => {
        return data
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
                return time;
            });
    }, [data]);

    const getDataCoinsDetailSorted = useCallback(() => {
        return data
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                return coin[1];
            });
    }, [data]);

    return (
        <div style={{ height: '80px', width: '140px' }}>
            <Line
                data={{
                    labels: getLabelsCoinsDetailSorted(),

                    datasets: [
                        {
                            label: `Price`,
                            data: getDataCoinsDetailSorted(),
                            fill: true,
                            backgroundColor: '#fff',
                            borderColor: theme,
                            showLine: true,
                            pointBackgroundColor: theme,
                        },
                    ],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 3,
                            hoverRadius: 4,
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
