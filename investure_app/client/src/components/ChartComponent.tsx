import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


interface totalReturns{
    ReferenceDate: string
    CumulativeReturn: number
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartComponent( {ReturnsData} : {ReturnsData: totalReturns[]} ){
    const [chartData, setChartData] = useState<{
        labels: string[],
        datasets: {
            label: string,
            data: number[],
            borderColor: string,
            backgroundColor: string,
            fill: boolean,
        }[]
    }>({
        labels: ["M","T","W","T","F","S","S"],
        datasets: [
        {
            label: 'Cumulative Return',
            data: [1,2,3,4,5,6,7],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
       },
    ],
    })


    return (
        <div>
            <Line data={chartData}></Line>
        </div>
    );
}

export default ChartComponent
