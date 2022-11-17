
import classNames from 'classnames/bind';
import styles from './TradeItem.module.scss'

import { Line } from 'react-chartjs-2';
import { data, deposit, labels, withdraw } from '~/data/dataChart';

const cx = classNames.bind(styles);

function TradeItem({ refChild }) {
    return (
        <tr style={{ backgroundColor: '#FFFFFF' }} ref={refChild}>
            <td colSpan="4" style={{ padding: '0' }}>
                <div className={cx('trade-item-child')}>
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: `Price $ `,
                                    data: data,
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
                                    label: 'Deposit $',
                                    data: deposit,
                                    fill: false,
                                    showLine: false,
                                    tension: 0.1,
                                    type: 'line',
                                    radius: 10,
                                    hoverRadius: 12,
                                    backgroundColor: 'rgb(77 ,201 ,246)',
                                    order: 0,
                                },
                                {
                                    label: 'Withdraw $',
                                    data: withdraw,
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
                            transitions: {
                                zoom: {
                                    animation: {
                                        duration: 1000,
                                        easing: 'easeOutCubic',
                                    },
                                },
                            },

                            tooltips: {
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
                                zoom: {
                                    limits: {
                                        y: { min: 0, max: 70000, minRange: 10000 },
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
                                tooltip: {
                                    mode: 'interpolate',
                                    intersect: false,
                                },
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

export default TradeItem;
