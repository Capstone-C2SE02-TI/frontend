import React, { memo } from 'react';
import { useCallback } from 'react';
import { Line } from 'react-chartjs-2';

function ChartCoinItem({ data, theme, labelTitle = 'Last 1 month', symbol }) {

    const getLabelsCoinsDetailSorted = useCallback(() => {
        return Object.keys(data)
            .map((key) => [Number(key), data[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                let date = new Date(Number(coin[0]));
                console.log(date)
                let time =
                    date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes().toString().length === 1 ? `0${date.getMinutes()} ` : date.getMinutes()
                        } PM`
                        : `${date.getHours()}:${date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
                        } AM`;
                return time;
            });
    }, [data]);

    const getDataCoinsDetailSorted = useCallback(() => {
        return Object.keys(data)
            .map((key) => [Number(key), data[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                return coin[1];
            });
    }, [data]);


    // console.log(getDataCoinsDetailSorted());
    // console.log(getLabelsCoinsDetailSorted());
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
                    hover: {
                        intersect: false,
                    },
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
                        crosshair: {
                            line: {
                                color: '#fff', // crosshair line color
                                width: 1, // crosshair line width
                            },
                            sync: {
                                enabled: true, // enable trace line syncing with other charts
                                group: 1, // chart group
                                suppressTooltips: false, // suppress tooltips when showing a synced tracer
                            },
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
