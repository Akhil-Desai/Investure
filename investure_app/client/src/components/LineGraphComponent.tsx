import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
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
import '../styles/ChartComponent.css';  // Import the CSS file

interface TotalReturns {
  ReferenceDate: string;
  CumulativeReturn: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

interface Chart {
  labels: string[];
  datasets: {
    label: string;
    data: string[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

function ChartComponent({ ReturnsData }: { ReturnsData: TotalReturns[] }) {
  const [chartData, setChartData] = useState<Chart>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: '',
        fill: false,
      },
    ],
  });

  const convertExcelDate = (excelSerialDate: string) => {
    const excelBaseDate = new Date(1900, 0, 1);
    const jsDate = new Date(excelBaseDate.getTime() + (parseInt(excelSerialDate) - 2) * 86400000);
    return jsDate;
  }

  const [averageReturn, setAverageReturn] = useState<number | null>(null);
  const [latestReturn, setLatestReturn] = useState<number | null>(null);
  const [maxReturn, setMaxReturn] = useState<number | null>(null);

  useEffect(() => {
    const refDate = ReturnsData.map((item) => {
        const date = convertExcelDate(item.ReferenceDate)
        return date.toISOString().split('T')[0]
    });
    const cumulativeRets = ReturnsData.map((item) => (item.CumulativeReturn * 100));

    const avgReturn = cumulativeRets.reduce((acc, val) => acc + val, 0) / cumulativeRets.length;
    const latest = cumulativeRets[cumulativeRets.length - 1];
    const max = Math.max(...cumulativeRets);

    const cumulativeRetsFixed = ReturnsData.map((item) => (item.CumulativeReturn * 100).toFixed(2));

    setChartData({
      labels: refDate,
      datasets: [
        {
          label: 'Cumulative Return',
          data: cumulativeRetsFixed,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });

    setAverageReturn(avgReturn);
    setLatestReturn(latest);
    setMaxReturn(max);
  }, [ReturnsData]);

  return (
    <div className="chart-container">
    <h2>S&P 500 Total Returns</h2>
        <Line data={chartData} options={chartOptions} />
      <div className="stats-container">
        <div className="stat-item">
          <strong>Average Return:</strong>
          <span>{averageReturn?.toFixed(2) || "N/A"}%</span>
        </div>
        <div className="stat-item">
          <strong>Latest Return:</strong>
          <span>{latestReturn?.toFixed(2) || "N/A"}%</span>
        </div>
        <div className="stat-item">
          <strong>Max Return:</strong>
          <span>{maxReturn?.toFixed(2) || "N/A"}%</span>
        </div>
      </div>
    </div>
  );
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.raw}%`,
      },
    },
    zoom: {
        pan: {
          enabled: true,
          mode: 'xy' as const,
          modifierKey:'alt' as const
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy' as const,
        },
      },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Cumulative Return (%)',
      },
    },
  },
};

export default ChartComponent;
