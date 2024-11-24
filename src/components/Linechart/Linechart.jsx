import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import './LineChart.css';

const Linechart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Price"]]);

    useEffect(() => {
        if (historicalData && Array.isArray(historicalData)) {
            let dataCopy = [["Date", "Price"]];
            historicalData.forEach((item) => {
                const formattedDate = new Date(item[0]).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });
                dataCopy.push([formattedDate, item[1]]);
            });
            setData(dataCopy);
        }
    }, [historicalData]);

    return (
        <div className="chart-container">
            <Chart
                chartType="LineChart"
                data={data}
                height="400px"
                options={{
                    title: "Price History (Last 10 Days)",
                    hAxis: { title: "Date" },
                    vAxis: { title: "Price" },
                }}
            />
        </div>
    );
};

export default Linechart;
