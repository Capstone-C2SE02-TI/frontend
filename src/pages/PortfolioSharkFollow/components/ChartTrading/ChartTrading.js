import React, { memo } from 'react';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { convertStringToTimeCurrent } from '~/helpers';
import { Chart } from 'chart.js';

function ChartTrading({ dataTransactionHistory, sharkAddress, name }) {
    // console.log(dataTransactionHistory);
    // console.log(sharkAddress);
    // console.log(name);

    // const dataTransactionIn = useMemo(() => {
    //     const transactionIns = dataTransactionHistory.filter(
    //         (trans) => trans.to.toLowerCase() === sharkAddress.toLowerCase(),
    //     );
    //     console.log(transactionIns);
    //     return transactionIns
    //         .slice()
    //         .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
    //         .map((trans) => {
    //             return { x: +trans.timeStamp, y: trans.pastPrice === 0 ? 10 : trans.pastPrice };
    //         });
    // }, [dataTransactionHistory, sharkAddress]);

    // const dataTransactionOut = useMemo(() => {
    //     const transactionIns = dataTransactionHistory.filter(
    //         (trans) => trans.to.toLowerCase() !== sharkAddress.toLowerCase(),
    //     );
    //     console.log(transactionIns);
    //     return transactionIns
    //         .slice()
    //         .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
    //         .map((trans) => {
    //             return { x: +trans.timeStamp, y: trans.pastPrice === 0 ? 10 : trans.pastPrice };
    //         });
    // }, [dataTransactionHistory, sharkAddress]);

    const chartRef = useRef();

    const initChart = () => {
        new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: [2018, 2019, 2020],
                datasets: [
                    {
                        data: [1.09, 1.48, 2.48],
                        label: 'ABC',
                        borderColor: '#3e95cd',
                        fill: false,
                    },
                    {
                        data: [0.63, 0.81, 0.95],
                        label: 'DEF',
                        borderColor: '#8e5ea2',
                        fill: false,
                    },
                    {
                        data: [0.17, 0.17, 0.18],
                        label: 'GHI',
                        borderColor: '#3cba9f',
                        fill: false,
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: 'Past 2FY + Current FY Estimate, US$ millions',
                },
                tooltips: {
                    mode: 'index',
                    callbacks: {
                        label: function (tooltipItem, data) {
                            // if (tooltipItem.index > 0) {
                            //     var previousdata = tooltipItem.index - 1;
                            //     var growth =
                            //         ', YoY: ' +
                            //         (
                            //             (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] /
                            //                 data.datasets[tooltipItem.datasetIndex].data[previousdata]) *
                            //                 100 -
                            //             100
                            //         ).toFixed(1) +
                            //         '%';
                            // } else {
                            //     var growth = '';
                            // }

                            // return (
                            //     data.datasets[tooltipItem.datasetIndex].label +
                            //     ': $' +
                            //     data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
                            //     growth
                            // );
                            return "jeasesa"
                        },
                        footer: function (tooltipItems, data) {
                            var sum = 0;

                            tooltipItems.forEach(function (tooltipItem) {
                                sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            });
                            return 'Sum: ' + sum;
                        },
                    },
                },
            },
        });
    };

    useEffect(() => {
        initChart();
    }, [chartRef]);

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default memo(ChartTrading);
