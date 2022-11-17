import { useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { historyData, dataPrice } from '~/data/historyData';
import  Button  from '~/components/Button';

const typeFilter = 'year';

function Report() {

    //
    const labelsTimeCoin = useMemo(() => {
        return dataPrice[typeFilter]
            .slice()
            .sort((prev, next) => +prev[0] - +next[0])
            .map((coin) => {
                let date = new Date(Number(coin[0]));
                return date.toLocaleDateString()
            });
    }, []);

       const dataPriceCoin = useMemo(() => {
           return dataPrice[typeFilter]
               .slice()
               .sort((prev, next) => +prev[0] - +next[0])
               .map((coin) => {
                   return coin[1];
               });
       }, []);

    const datasetsDeposit = useMemo(() => {
        return historyData
            .filter((data) => data.status === 'deposit')
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((data) => {
                let date = new Date(+data.timeStamp);
                return { x: date.toLocaleDateString(), y: data.value / 10000 };
            });
    }, []);

    const datasetsWithDraw = useMemo(() => {
        return historyData
            .filter((data) => data.status === 'withdraw')
            .sort((prev, next) => +prev.timeStamp - +next.timeStamp)
            .map((data) => {
                let date = new Date(+data.timeStamp);
                return { x: date.toLocaleDateString(), y: data.value / 10000000 };
            });
    }, []);
    const canvasRef = useRef();

  const handleResetZoom = () => {
      if (canvasRef && canvasRef.current) {
          canvasRef.current.resetZoom();
      }
  };

    return (
        <div style={{ width: '90%' }}>
            <Button outline onClick={handleResetZoom}>
                Reset Zoom
            </Button>
            <Line
                ref={canvasRef}
                data={{
                    labels: labelsTimeCoin,
                    datasets: [
                        {
                            label: `Price $ `,
                            data: dataPriceCoin,
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
                            data: datasetsDeposit,
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
                    // tooltips: {
                    //     cornerRadius: 12, //<- set this
                    // },
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
    );
}

export default Report;
