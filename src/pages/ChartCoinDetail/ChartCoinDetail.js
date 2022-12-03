// import { log } from '@uniswap/smart-order-router';
import React, { memo } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { numberWithCommas } from '~/helpers';

function ChartCoinDetail({ data, typeFilter = 'day', time, symbol, canvasRef }) {
    let delayed;
    console.log(data);
    const getLabelsCoinsDetailSorted = useMemo(() => {
        const dataCoinDetail = data.prices[typeFilter];

        return Object.keys(dataCoinDetail)
            .map((key) => [Number(key), dataCoinDetail[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                let date = new Date(Number(coin[0]) * 1000);
                let time =
                    date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes().toString().length === 1 ? `0${date.getMinutes()} ` : date.getMinutes()
                        } PM`
                        : `${date.getHours()}:${date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
                        } AM`;
                if (typeFilter === 'month') {
                    return date.toLocaleDateString().split('/', 2).join('/');
                } else return typeFilter === 'day' ? time : date.toLocaleDateString();
            });
    }, [data.prices, typeFilter]);

    const getDataCoinsDetailSorted = useMemo(() => {
        const dataCoinDetail = data.prices[typeFilter];

        return Object.keys(dataCoinDetail)
            .map((key) => [Number(key), dataCoinDetail[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                return coin[1];
            });
    }, [data.prices, typeFilter]);
    return (
        <div>
            <Line
                ref={canvasRef}
                data={{
                    labels: getLabelsCoinsDetailSorted,
                    datasets: [
                        {
                            data: getDataCoinsDetailSorted,
                            labels: 'hello',
                            fill: true,
                            backgroundColor: function (context) {
                                const chart = context.chart;
                                const { ctx, chartArea } = chart;

                                if (!chartArea) {
                                    // This case happens on initial chart load
                                    return;
                                }
                                var gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgb(130 238 247)');
                                gradient.addColorStop(1, 'rgb(17, 46 ,61)');
                                return gradient;
                            },
                            borderColor: '#fff',
                            pointBackgroundColor: '#275361',
                            showLine: false,
                            tension: 0.02,
                            pointStyle: 'rectRot',
                        },
                    ],
                }}
                options={{
                    radius: 5,
                    hoverRadius: 13,
                    hitRadius: 30,
                    responsive: true,
                    pointHoverBackgroundColor: '#275361',
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (
                                context.type === 'data' &&
                                context.mode === 'default' &&
                                !delayed &&
                                typeFilter === 'day'
                            ) {
                                delay = context.dataIndex * 160 + context.datasetIndex * 50;
                            } else if (
                                context.type === 'data' &&
                                context.mode === 'default' &&
                                !delayed &&
                                typeFilter === 'month'
                            ) {
                                delay = context.dataIndex * 50 + context.datasetIndex * 10;
                            } else {
                                delay = context.dataIndex * 10 + context.datasetIndex * 3;
                            }
                            return delay;
                        },
                    },

                    scales: {
                        y: {
                            ticks: {
                                callback: function (value) {
                                    return '$' + value.toFixed(3);
                                },
                            },
                        },
                    },
                    elements: {
                        point: {
                            radius: typeFilter === 'year' ? 1 : 3,
                            backgroundColor: 'rgb(77 ,201 ,246)',
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Statistics Chart',
                            fullSize: true,
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return (
                                        `Price (${time}) in ${symbol.toUpperCase()}: $ ` +
                                        numberWithCommas(context.parsed.y.toFixed(3))
                                    );
                                },
                            },
                        },
                        zoom: {
                            limits: {
                                y: {
                                    min: Math.min(...getDataCoinsDetailSorted),
                                    max: Math.max(...getDataCoinsDetailSorted),
                                    minRange:
                                        (Math.max(...getDataCoinsDetailSorted) -
                                            Math.min(...getDataCoinsDetailSorted)) /
                                        20,
                                },
                            },
                            pan: {
                                enabled: true,
                                mode: 'xy',
                                threshold: 5,
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true,
                                },
                                mode: 'xy',
                            },
                        },
                        crosshair: {
                            line: {
                                color: 'rgb(91 171 183)', // crosshair line color
                                width: 1, // crosshair line width
                            },
                        },
                    },
                    hover: {
                        intersect: false,
                    },
                }}
            />
        </div>
    );
}

export default memo(ChartCoinDetail);
