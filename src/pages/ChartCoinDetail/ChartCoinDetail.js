import React, { memo } from 'react';
import { useMemo } from 'react';
import { useCallback, useRef } from 'react';
import { Line } from 'react-chartjs-2';

function ChartCoinDetail({ data, typeFilter = 'day', time, symbol }) {
    const canvasRef = useRef()
  let delayed;
    const getLabelsCoinsDetailSorted = useMemo(() => {
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
                if (typeFilter === 'month') {
                    return date.toLocaleDateString().split('/',2).join('/') 
                } else
                    return typeFilter === 'day' ? time : date.toLocaleDateString();
            });
    }, [data.prices, typeFilter]);

    const getDataCoinsDetailSorted = useMemo(() => {
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
                ref={canvasRef}
                data={{
                    labels: getLabelsCoinsDetailSorted,

                    datasets: [
                        {
                            label: `Price (${time}) in ${symbol} `,
                            data: getDataCoinsDetailSorted,
                            fill: true,
                            backgroundColor: function (context) {
                                const chart = context.chart;
                                const { ctx, chartArea } = chart;

                                if (!chartArea) {
                                    // This case happens on initial chart load
                                    return;
                                }
                                var gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgba(58,123,231,1)');
                                gradient.addColorStop(1, 'rgba(0,210,255,0.3)');
                                return gradient;
                            },
                            borderColor: '#fff',
                            pointBackgroundColor: 'rgb(77 ,201 ,246)',
                            showLine: false,
                            tension: 0.02,
                        },
                    ],
                }}
                options={{
                    radius: 5,
                    hoverRadius: 13,
                    hitRadius: 30,
                    responsive: true,
                    pointHoverBackgroundColor: 'rgb(77 ,201 ,246)',
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
                        legend: {
                            display: false,
                            labels: {
                                usePointStyle: true,
                            },
                        },
                        title: {
                            display: true,
                            text: 'Trading chart',
                            color: '#482ee8',
                            fullSize: true,
                            font: {
                                size: 20,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default memo(ChartCoinDetail);
