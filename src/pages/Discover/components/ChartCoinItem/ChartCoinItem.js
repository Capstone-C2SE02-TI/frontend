import React, { memo } from 'react';
import {  useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { convertUnixTime, numberWithCommas } from '~/helpers';

function ChartCoinItem({ data, theme }) {
    const getLabelsCoinsDetailSorted = useMemo(() => {
        return Object.keys(data)
            .map((key) => [Number(key), data[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                return convertUnixTime(Number(coin[0])).split(' ')[0];
            });
    }, [data]);
    const getDataCoinsDetailSorted = useMemo(() => {
        return Object.keys(data)
            .map((key) => [Number(key), data[key]])
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
                    labels: getLabelsCoinsDetailSorted,

                    datasets: [
                        {
                            label: `Price`,
                            data: getDataCoinsDetailSorted,
                            fill: true,
                            backgroundColor: '#fff',
                            borderColor: theme,
                            showLine: true,
                            pointBackgroundColor: theme,
                            tension: 0.02,
                            borderWidth: 2,
                        },
                    ],
                }}
                options={{
                    hover: {
                        intersect: false,
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hoverRadius: 1,
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return '$' + numberWithCommas(context.parsed.y.toFixed(3));
                                },
                            },
                        },
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
