import 'chartjs-plugin-zoom';
import React, { memo } from 'react';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { convertDate, convertTime } from '~/helpers';
import styles from './ChartTrading.module.scss';
function ChartTrading({ dataTransactionHistory, sharkAddress, name }) {
console.log(dataTransactionHistory);
    const pastPriceData = useMemo(() => {
        return dataTransactionHistory
            .slice()
            .filter((shark) => shark.presentPrice > 1 && shark.pastPrice > 1)
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((trans) => {
                return {
                    y: +trans.pastPrice*100/trans.presentPrice,
                    x: `${convertDate(+trans.timeStamp * 1000)} ${convertTime(+trans.timeStamp * 1000)}`,
                    z: trans.tokenSymbol.toUpperCase(),
                };
            });
    }, [dataTransactionHistory, sharkAddress]);

    const presentPriceData = useMemo(() => {
        return dataTransactionHistory
            .slice()
            .filter((shark) => shark.presentPrice > 1 && shark.pastPrice > 1)
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((trans) => {
                return {
                    y: 100,
                    x: `${convertDate(+trans.timeStamp * 1000)} ${convertTime(+trans.timeStamp * 1000)}`,
                    z: trans.tokenSymbol.toUpperCase(),
                };
            });
    }, [dataTransactionHistory, sharkAddress]);

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Transaction shark {name}</h3>
            <Bar
                data={{
                    // labels: dataTransactionHistory.filter(shark => shark.presentPrice > 1 && shark.pastPrice > 1).map((trans) => `${convertDate(+trans.timeStamp * 1000)} ${convertTime(+trans.timeStamp * 1000)}`),
                    datasets: [
                        {
                            data: pastPriceData,
                            label: 'Past Price',
                            backgroundColor: 'rgb(255, 205, 86)',
                            fill: true,
                        },
                        {
                            data: presentPriceData,
                            label: 'Present Price',

                            backgroundColor: 'rgb(54, 162, 235)',
                            fill: true,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        tooltip: {
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
                                    const index = context.dataIndex;
                                    const value = context.dataset.data[index];
                                    return label + ' ' + value.z;
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default memo(ChartTrading);
