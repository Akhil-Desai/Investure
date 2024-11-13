//imports
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
import '../styles/LineGraphComponent.css';

interface TotalReturns {
  ReferenceDate: string;
  CumulativeReturn: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

interface Chart {
  labels: string[]; // Array of dates for the X-axis
  datasets: {
    label: string; // Dataset label displayed in the legend
    data: string[]; // Array of cumulative data points
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

/**
 * Renders a line chart for visualizing cumulative returns data over time.
 *
 * @param {Object} props - Component props
 * @param {TotalReturns[]} props.ReturnsData - Array of cumulative returns data
 *
 * @component
 */

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

 /**
   * Converts Excel serial date format to a JavaScript Date.
   * @param {string} excelSerialDate - The Excel serial date string.
   * @returns {Date} - The converted JavaScript Date object.
   */
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

    //Finds average cumulative returns
    const avgReturn = cumulativeRets.reduce((acc, val) => acc + val, 0) / cumulativeRets.length;

    //Finds latest cumulative returns
    const latest = cumulativeRets[cumulativeRets.length - 1];

    //Finds max cumulative return
    const max = Math.max(...cumulativeRets);

    //Fixes cumulative data points to 2 decimal places
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
