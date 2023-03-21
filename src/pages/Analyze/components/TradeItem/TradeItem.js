import classNames from 'classnames/bind';
import styles from './TradeItem.module.scss';

import { Line } from 'react-chartjs-2';
import { memo } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TradeItem({ refChild, coinInfoData, historyData }) {
    const [typeFilter, setTypeFilter] = useState('month');

    const getLabelsCoinsDetailSorted = useMemo(() => {
        const dataCoinDetail = coinInfoData.prices[typeFilter];

        return Object.keys(dataCoinDetail)
            .map((key) => [Number(key), dataCoinDetail[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                let date = new Date(Number(coin[0]) * 1000);
                let time =
                    date.getHours() > 12
                        ? `${date.getHours() - 12}:${
                              date.getMinutes().toString().length === 1 ? `0${date.getMinutes()} ` : date.getMinutes()
                          } PM`
                        : `${date.getHours()}:${
                              date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
                          } AM`;
                if (typeFilter === 'month') {
                    return date.toLocaleDateString().split('/', 3).join('/');
                } else return typeFilter === 'day' ? time : date.toLocaleDateString();
            });
    }, [typeFilter]);

    const getDataCoinsDetailSorted = useMemo(() => {
        const dataCoinDetail = coinInfoData.prices[typeFilter];

        return Object.keys(dataCoinDetail)
            .map((key) => [Number(key), dataCoinDetail[key]])
            .slice()
            .sort((prev, next) => Number(prev[0]) - Number(next[0]))
            .map((coin) => {
                return coin[1];
            });
    }, [typeFilter]);


    const datasetsDeposit = useMemo(() => {
        return historyData
            .filter((data) => data.status === 'deposit')
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((data) => {
                let date = new Date(+data.timeStamp);
                return { x: date, y: data.value / 10000 };
            });
    }, []); 

    const datasetsWithDraw = useMemo(() => {
        return historyData
            .filter((data) => data.status === 'withdraw')
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((data) => {
                let date = new Date(+data.timeStamp);
                return { x: date, y: data.value / 10000000 };
            });
    }, []);
    return (
        <tr style={{ backgroundColor: '#FFFFFF' }} ref={refChild}>
            <td colSpan="4" style={{ padding: '0' }}>
                <div className={cx('trade-item-child')}>
                    <Line
                        data={{
                            //x
                            labels: getLabelsCoinsDetailSorted,
                            datasets: [
                                {
                                    label: `Price% `,
                                    //y
                                    data: getDataCoinsDetailSorted,
                                    tension: 0.1,
                                    type: 'line',
                                    borderColor: '#cdf8f8',
                                    pointStyle: 'rectRot',
                                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                                    pointHoverBackgroundColor: '#74a5a5',
                                    pointHoverBorderColor: '#fff',
                                    hoverRadius: 10,
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
                                    fill: true,
                                    order: 1,
                                },
                                {
                                    label: 'deposit',
                                    data: datasetsDeposit,
                                    fill: false,
                                    showLine: false,
                                    tension: 0.1,
                                    type: 'line',
                                    radius: 10,
                                    hoverRadius: 12,
                                    backgroundColor: 'rgb(77 ,201 ,246)',
                                    order: 0,
                                    // xAxisID: 'xAxis1',
                                    // yAxisID: 'yAxis1',
                                },
                                {
                                    label: 'Withdraw $',
                                    data: datasetsWithDraw,
                                    fill: false,
                                    showLine: false,
                                    tension: 0.1,
                                    type: 'line',
                                    backgroundColor: 'rgb(249, 20, 72)',
                                    radius: 10,
                                    hoverRadius: 12,
                                    order: 0,
                                },
                            ],
                        }}
                        options={{
                            // scales: {
                            //     yAxis1: {
                            //         // type: 'category',
                            //         // grid: {
                            //         //     drawOnChartArea: false, // only want the grid lines for one axis to show up
                            //         // },
                            //         ticks: {
                            //             callback: function (value, index, ticks) {
                            //                 // let realLabel = this.getLabelForValue(label);

                            //                 // var month = realLabel.split(';')[0];
                            //                 // var year = realLabel.split(';')[1];
                            //                 // if (month === 'February') {
                            //                 //     return year;
                            //                 // } else {
                            //                 //     return '';
                            //                 // }
                            //                 return '$asdas' + value;
                            //             },
                            //         },
                            //     },
                            // },

                            transitions: {
                                zoom: {
                                    animation: {
                                        duration: 1000,
                                        easing: 'easeOutCubic',
                                    },
                                },
                            },

                            tooltips: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.dataset.label || '';

                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(context.parsed.y);
                                        }
                                        return 'setlable' + label;
                                    },
                                },
                                cornerRadius: 12, //<- set this
                            },
                            legend: {
                                display: false,
                                position: 'bottom',
                                labels: {
                                    fontColor: '#000080',
                                },
                            },

                            plugins: {
                                datalabels: {
                                    formatter: function (value) {
                                        return 'hello gyu';
                                    },
                                },
                                // zoom: {
                                //     limits: {
                                //         y: { min: 0, max: 70000, minRange: 10000 },
                                //     },
                                //     pan: {
                                //         enabled: true,
                                //         mode: 'xy',
                                //         threshold: 5,
                                //     },
                                //     zoom: {
                                //         wheel: {
                                //             enabled: true,
                                //         },
                                //         pinch: {
                                //             enabled: true,
                                //         },
                                //         mode: 'xy',
                                //     },
                                // },
                                // tooltip: {
                                //     mode: 'interpolate',
                                //     intersect: false,
                                // },
                                crosshair: {
                                    line: {
                                        color: 'rgb(91 171 183)', // crosshair line color
                                        width: 1, // crosshair line width
                                    },
                                },
                            },
                        }}
                    ></Line>
                </div>
            </td>
        </tr>
    );
}

export default memo(TradeItem);
