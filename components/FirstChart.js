import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function FirstChart({ labels, data, backgroundColors }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "2019",
              data: data,
              backgroundColor: backgroundColors,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: false,
            },
          },
        },
      });

      return () => {
        myChart.destroy(); // Cleanup the chart instance on unmount
      };
    }
  }, [labels, data]);

  return <canvas ref={chartRef} />;
}

export default FirstChart;
