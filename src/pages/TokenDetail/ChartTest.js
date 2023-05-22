import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

export const ChartComponent = ({ data, typeFilter = 'day', time, symbol, prediction }) => {

    const chartContainerRef = useRef();
    const getLabelsCoinsDetailSorted = useMemo(() => {
        const startTime = '2023-01-01';
        const endTime = '2023-05-30';
        const chartData = [];
        prediction.forEach((prediction, index) => {
            if (index === 3462 || index === 3461 || index === 3463) {

                console.log(Object.keys(prediction)[0]);
            }
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
    }, [prediction])
    const getDataCoinsDetailSorted = useMemo(() => {
        const startTime = '2020-01-01';
        const endTime = '2023-05-30';
        const chartData = [];
        prediction.forEach((prediction, index) => {
            if (index === 3462 || index === 3461 || index === 3463) {

                console.log(Object.keys(prediction)[0]);
            }
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
                console.log('runnnnnnnnnnnnnnnnnnnnnnnnn');
                chartData.push({ y: Object.values(prediction)[0].price, x: time, signal: Object.values(prediction)[0].signal }
                )
            }
        })

        return chartData;
    }, [prediction])
    return (
        <Line data={{
            // labels: getLabelsCoinsDetailSorted,
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
                    tension: 0,
                    pointStyle: function (context) {
                        console.log(context.raw.signal);
                        if (context.raw.signal === 1) {
                            console.log('star');
                            return 'circle'
                        }
                        else if (context.raw.signal === 0) {
                            console.log('cỉcrcle');
                            return 'triangle'
                        }
                        return 'line';
                    },
                },
            ],

        }}

            options={{



            }}
        />
    );
};