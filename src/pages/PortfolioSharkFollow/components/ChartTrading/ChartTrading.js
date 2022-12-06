import 'chartjs-plugin-zoom';
import React, { memo } from 'react';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { convertStringToTimeCurrent } from '~/helpers';

function ChartTrading({ dataTransactionHistory, sharkAddress, name }) {

    console.log(dataTransactionHistory);

    const dataTransactionIn = useMemo(() => {
        // const transactionIns = dataTransactionHistory.filter(
        //     (trans) => trans.to.toLowerCase() === sharkAddress.toLowerCase(),
        // );
        // console.log(transactionIns);
        return dataTransactionHistory
            .slice()
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((trans) => {
                return { x: convertStringToTimeCurrent(+trans.timeStamp), y: trans.pastPrice };
            });
    }, [dataTransactionHistory, sharkAddress]);

    const dataTransactionOut = useMemo(() => {
        // const transactionIns = dataTransactionHistory.filter(
        //     (trans) => trans.to.toLowerCase() !== sharkAddress.toLowerCase(),
        // );
        // console.log(transactionIns);
        return dataTransactionHistory
            .slice()
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((trans) => {
                return { x: convertStringToTimeCurrent(+trans.timeStamp), y: trans.presentPrice };
            });
    }, [dataTransactionHistory, sharkAddress]);

    // console.log(dataTransactionIn)
    // console.log(dataTransactionOut)



    return (
        <div>
            <Line data={{
                datasets: [
                    {
                        data: dataTransactionIn,
                        label: 'dataTransactionIn',
                        borderColor: '#21ce66',
                        fill: true,
                    },
                    {
                        data: dataTransactionOut,
                        label: 'dataTransactionOut',
                        borderColor: 'red',
                        fill: true,
                    },

                ],
            }} />
        </div>
    );
}

export default memo(ChartTrading);
