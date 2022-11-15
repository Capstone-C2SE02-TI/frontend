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
        let otherPercent = 0;
        let cryptosSharkWalletAcc = cryptosSharkWallet
            .filter((crypto) => crypto.total)
            .sort((prev, next) => {
                return next?.total - prev?.total;
            });
        if (cryptosSharkWallet.length > 20) {
            otherPercent = cryptosSharkWalletAcc.slice(21, cryptosSharkWallet.length).reduce((percent, crypto) => {
                return (crypto.total / totalAssetCrypto) * 100 + percent;
            }, 0);
        }
        const dataPercent = cryptosSharkWalletAcc.slice(0, 20).map((crypto) => (crypto.total / totalAssetCrypto) * 100);
        return otherPercent !== 0 ? [...dataPercent, otherPercent] : dataPercent;
    }, [cryptosSharkWallet, totalAssetCrypto]);

    const labelsDoughnut = useMemo(() => {
        let otherPercentLabel = 0;
        let cryptosSharkWalletAcc = cryptosSharkWallet
            .filter((crypto) => crypto.total)
            .sort((prev, next) => {
                return next?.total - prev?.total;
            });

        if (cryptosSharkWallet.length > 20) {
            otherPercentLabel = cryptosSharkWalletAcc.slice(21, cryptosSharkWallet.length).reduce((percent, crypto) => {
                return (crypto.total / totalAssetCrypto) * 100 + percent;
            }, 0).toFixed(2)
            otherPercentLabel = `Other ${otherPercentLabel}%`;
        }

        const labelPercent = cryptosSharkWalletAcc.slice(0, 20).map((crypto) => {
            const percent = ((crypto.total / totalAssetCrypto) * 100).toFixed(2);
            return ` ${crypto.symbol} ${percent}%`;
        });

        return otherPercentLabel !== 0 ? [...labelPercent, otherPercentLabel] : labelPercent;
        // ${crypto.name}
    }, [cryptosSharkWallet, totalAssetCrypto]);
    console.log(labelsDoughnut);
    console.log(dataDoughnut);

    return (
        <div className={cx('chart-circle')}>
            <Doughnut
                data={{
                    labels: labelsDoughnut,
                    datasets: [
                        {
                            // label: `Price (${time}) in ${symbol} `,
                            data: dataDoughnut,
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
