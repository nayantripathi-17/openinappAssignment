'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChartComponent() {

    const [dataset, setDataset] = useState<number[]>([])

    const options = useMemo(() => ({
        cutout: "80%",
        radius: "60%",
        plugins: {
            legend: {
                position: 'right' as const,
                align: 'center' as const,
                labels: {
                    boxWidth: 20,
                    boxHeight: 20,
                    useBorderRadius: true,
                    borderRadius: 10,
                    font: {
                        size: 14,
                        family: '__Montserrat_cce811',
                        weight: 700,
                    },
                    color: "#000"
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
                align: 'end' as const,
                fullSize: true,
            },
        }
    }), [])

    const labels = useMemo(() => ["Basic Trees", "Custom Short Pants", "Super Hoodies"], [])

    const data = useMemo(() => ({
        responsive: true,
        labels: labels,
        datasets: [
            {
                data: dataset,
                borderAlign: 'center' as const,
                spacing: -15,
                backgroundColor: [
                    "#98D89E",
                    "#F6DC7D",
                    "#EE8484",
                ],
                borderWidth: 0,
                rotation: 225,
                borderRadius: {
                    innerStart: 10,
                    outerStart: 10,
                    innerEnd: 10,
                    outerEnd: 10
                },

            },
        ],
    }), [labels, dataset])

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/data', {
                method: "GET"
            })
            const data = await res.json() as { weeklyData: { user: number[], guest: number[] }, topProducts: number[] }
            setDataset(data.topProducts)
        })()
    }, [])

    return (
        <Doughnut data={data} options={options} />
    )
}

export default DoughnutChartComponent