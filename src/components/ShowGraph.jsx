import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import fetchData from '../helpers/fetchData';

const ShowGraph = ({ idCoin, name, price }) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const getDataFromGraph = async () => {
            try {
                const data = await fetchData(`https://api.coingecko.com/api/v3/coins/${idCoin}/market_chart?vs_currency=usd&days=8`);

                const filteredData = data.prices.filter((price, index) => index % 24 === 0);

                const formattedData = {
                    labels: filteredData.map((price) => new Date(price[0]).toLocaleDateString()),
                    datasets: [
                        {
                            label: `Precio de ${name} (USD)`,
                            data: filteredData.map((price) => price[1]),
                            backgroundColor: 'rgba(122, 147, 171)',
                            hoverBackgroundColor: 'rgba(188, 255, 0)',
                            borderWidth: 4,
                            borderRadius: '100',
                        },
                    ],
                };

                setChartData(formattedData);
            } catch (error) {
                console.error(error);
            }
        };

        getDataFromGraph();
    }, [idCoin, name]);

    useEffect(() => {
        if (chartData && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                display: false,
                            },
                            ticks: {
                                display: false,
                                stepSize: 500,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div className="showDataInGraph">
            <div className="chartContainer">
                <h1>Sales Activity</h1>
                {chartData ? <canvas ref={chartRef}></canvas> : <p>Loading...</p>}
            </div>

            <div className="additionalData">
                <h4 className='cryptocurrencyName'>{name}</h4>
                <div className='cryptocurrencyPrice'>
                    <h1>{price.toFixed(2).replace('.', ',')}</h1>
                    <h1>USD</h1>
                </div>
            </div>
        </div>
    );
};

export default ShowGraph;
