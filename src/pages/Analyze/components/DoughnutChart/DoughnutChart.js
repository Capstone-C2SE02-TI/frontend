import { memo, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import styles from './DoughnutChart.module.scss';

const data = {
    datasets: [
        {
            data: [10, 20, 30],
            backgroundColor: ['red', 'blue', 'yellow'],
        },
    ],
    labels: ['Red', 'Yellow', 'Blue'],
};

const cx = classNames.bind(styles);


function DoughnutChart({ cryptosSharkWallet }) {

    const totalAssetCrypto = useMemo(() => {
        const total = cryptosSharkWallet?.reduce((totalAsset, crypto) => {
            return crypto?.total ? totalAsset + crypto.total : totalAsset;
        }, 0);
        return total;
    }, [cryptosSharkWallet]);

    const dataDoughnut = useMemo(() => {
        return cryptosSharkWallet
            .slice()
            .filter((crypto) => crypto.total)
            .sort((prev, next) => {
                return next?.total - prev?.total;
            })
            .map((crypto) => (crypto.total / totalAssetCrypto) * 100);
    }, [cryptosSharkWallet, totalAssetCrypto]);


    const labelsDoughnut = useMemo(() => {
        return cryptosSharkWallet
            .slice()
            .filter((crypto) => crypto.total)
            .sort((prev, next) => {
                return next?.total - prev?.total;
            })
            .map((crypto) => {
                const percent = ((crypto.total / totalAssetCrypto) * 100).toFixed(2)
                return ` ${crypto.symbol} ${percent}%`
            });
        // ${crypto.name}
    }, [cryptosSharkWallet, totalAssetCrypto]);


    return (
        <div className={cx('chart-circle')}>
            <Doughnut
                data={{
                    labels: labelsDoughnut.length > 20 ? labelsDoughnut.slice(0, 10) : labelsDoughnut,
                    datasets: [
                        {
                            // label: `Price (${time}) in ${symbol} `,
                            data: dataDoughnut.length > 20 ? dataDoughnut.slice(0, 10) : dataDoughnut,
                            // fill: true,
                            backgroundColor: dataDoughnut.map((_, i) => {
                                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                                return `#${randomColor}`;
                            }),
                            // borderColor: 'rgba(61, 55, 241, 0.2)',
                            // showLine: false,
                        },
                    ],
                    options: {
                        plugins: {
                            datalabels: {
                                formatter: (value) => {
                                    if (value < 15) return '';
                                    return value + '%';
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default memo(DoughnutChart);
