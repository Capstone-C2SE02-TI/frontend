import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import images from '~/assets/images';

export const ChartComponent = ({ canvasRef, prediction, filter }) => {
    const [dataZoom, setDataZoom] = useState([])


    const chartContainerRef = useRef();
    const getLabelsCoinsDetailSorted = useMemo(() => {
        const startTime = `${filter}-01-01`;
        const endTime = `${Number(filter) + 1}-01-01`;
        const chartData = [];
        prediction.forEach((prediction, index) => {

            const date = new Date(Number(Object.keys(prediction)[0]) * 1000)
            let arr = date.toLocaleDateString().replace(/\//g, "-").split("-");
            if (arr[1].length === 1) {
                arr[1] = '0' + arr[1];
            }
            if (arr[0].length === 1) {
                arr[0] = '0' + arr[0];
            }
            const time = arr[2] + "-" + arr[0] + "-" + arr[1];
            if (time <= endTime && time >= startTime && index !== 3463) {
                chartData.push(time
                )
            }
        })

        return chartData;
    }, [prediction, filter])


    const getDataCoinsDetailSorted = useMemo(() => {
        console.log({ filter });
        const startTime = `${filter}-01-01`;
        const endTime = `${Number(filter) + 1}-01-01`;
        const chartData = [];
        prediction.forEach((prediction, index) => {
            const date = new Date(Number(Object.keys(prediction)[0]) * 1000)
            let arr = date.toLocaleDateString().replace(/\//g, "-").split("-");
            if (arr[1].length === 1) {
                arr[1] = '0' + arr[1];
            }
            if (arr[0].length === 1) {
                arr[0] = '0' + arr[0];
            }
            const time = arr[2] + "-" + arr[0] + "-" + arr[1];
            if (time <= endTime && time >= startTime && index !== 3463) {
                chartData.push({ y: Object.values(prediction)[0].price, x: time, signal: Object.values(prediction)[0].signal })
                setDataZoom(prev => [...prev, Object.values(prediction)[0].price])
            }
        })

        return chartData;
    }, [prediction, filter])

    var increase = new Image(20, 20)
    var decrease = new Image(20, 20)
    increase.src = 'https://cdn-icons-png.flaticon.com/128/7327/7327422.png'
    decrease.src = 'https://cdn-icons-png.flaticon.com/512/7327/7327424.png'

    const zoomOptions = useMemo(() => {
        return {
            limits: {
                y: {
                    min: Math.min(...dataZoom),
                    max: Math.max(...dataZoom),
                    minRange:
                        (Math.max(...dataZoom) -
                            Math.min(...dataZoom)) /
                        20,
                },
            },
            pan: {
                enabled: true,
                mode: 'xy',
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'xy',
                onZoomComplete({ chart }) {
                    // This update is needed to display up to date zoom level in the title.
                    // Without this, previous zoom level is displayed.
                    // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                    chart.update('none');
                }
            }
        };
    }, [dataZoom])
    return (
        <Line
            ref={canvasRef}
            data={{
                labels: getLabelsCoinsDetailSorted,
                datasets: [
                    {
                        data: getDataCoinsDetailSorted,
                        lineTension: 0,
                        fill: false,
                        borderColor: 'rgb(56, 97, 251)',
                        backgroundColor: 'rgba(255, 255, 255)',
                        borderDash: [],
                        pointBorderColor: 'rgb(56, 97, 251)',
                        pointBackgroundColor: 'rgba(255, 255, 255)',

                        pointRadius: 1,
                        // pointHitRadius: 0,
                        // pointBorderWidth: 0,

                        pointStyle: function (context) {

                            if (context.raw.signal === 1) {
                                return decrease
                            }
                            else if (context.raw.signal === 0) {
                                return increase
                            }
                            return ''
                        },
                    },
                ],

            }}

            options={{
                legend: {
                    display: false
                },
                plugins: {
                    zoom: zoomOptions
                }

            }}
        />
    );
};