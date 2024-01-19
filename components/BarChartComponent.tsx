'use client'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChartComponent() {
    const [dataset, setDataset] = useState<{
        user: number[], guest: number[]
    }>({
        user: [], guest: []
    })

    const options = useMemo(() => ({
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                ticks: {
                    callback: (val: number | string) => {
                        return Number(val) % 100 === 0 ? val : null
                    },
                },
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    useBorderRadius: true,
                    borderRadius: 5,
                    font: {
                        size: 14,
                        family: 'Lato'
                    }
                }
            },
            title: {
                display: true,
                text: 'May - June 2021',
                font: {
                    size: 16,
                    family: '__Montserrat_cce811',
                    weight: 400,
                },
                color: "#858585",
                position: 'top' as const,
                align: 'start' as const,
                fullSize: true,
            },
            labels: {
                display: true,
                font: {
                    size: 14,
                    family: 'Lato'
                },
                color: "#858585"
            }
        },
    }), []);

    const labels = useMemo(() => ["Week 1", "Week 2", "Week 3", "Week 4"], []);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/data', {
                method: "GET"
            })
            const data = await res.json() as { weeklyData: { user: number[], guest: number[] }, topProducts: number[] }
            setDataset(data.weeklyData)
        })()
    }, [])

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Guest',
                data: dataset.guest,
                backgroundColor: "#98D89E",
                borderRadius: 5,
                barPercentage: 0.75,
            },
            {
                label: 'User',
                data: dataset.user,
                backgroundColor: "#EE8484",
                borderRadius: 5,
                barPercentage: 0.75,
            },
        ],
    }), [labels, dataset]);

    return (
        <Bar options={options} data={data} />
    )
}

export default BarChartComponent