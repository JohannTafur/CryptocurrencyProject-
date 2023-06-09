import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ShowGraph = ({ idCoin, price }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${idCoin}/market_chart?vs_currency=usd&days=8`
                );
                const marketData = await response.json();

                const groupedData = marketData.prices.reduce(
                    (result, [timestamp, price]) => {
                        const date = new Date(timestamp);
                        const day = date.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric'
                        });

                        if (!result[day]) {
                            result[day] = [];
                        }

                        result[day].push(price);

                        return result;
                    },
                    {}
                );

                const averagedData = Object.entries(groupedData).map(
                    ([day, prices]) => ({
                        x: new Date(day),
                        y: prices.reduce((sum, price) => sum + price, 0) / prices.length,
                        label: `$${(prices.reduce((sum, price) => sum + price, 0) / prices.length).toFixed(2)}`
                    })
                );

                if (averagedData && averagedData.length > 0) {
                    const chartLabels = averagedData.map((data) => data.x.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }));

                    const chartValues = averagedData.map((data) => data.y.toFixed(2));

                    setChartData({
                        labels: chartLabels,
                        datasets: [
                            {
                                label: 'Sales Activity',
                                data: chartValues,
                                backgroundColor: 'rgb(176, 196, 222)', // Color de las barras (lightsteelblue en formato RGB)
                                hoverBackgroundColor: 'limegreen' // Color de las barras al pasar el mouse sobre ellas
                            }
                        ]
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (idCoin) {
            fetchData();
        }
    }, [idCoin]);

    return (
        <div className="showDataInGraph">
            <h1 className="title">Sales Activity</h1>
            <div className="chartContainer">
                {chartData ? (
                    <Bar
                        data={chartData}
                        options={{
                            scales: {
                                y: {
                                    display: false // Oculta la escala del eje y
                                },
                                x: {
                                    ticks: {
                                        callback: (value) => {
                                            const date = new Date(value);
                                            return date.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            });
                                        }
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: (context) => `$${context.parsed.y.toFixed(2)}`
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <div>Loading chart data...</div>
                )}
            </div>
            <div className="price">
                ${price}
            </div>
        </div>
    );
};

export default ShowGraph;
