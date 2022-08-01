import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// do two charts in a div one for score one for accuracy
function Chart(props: any) {
    console.log("props", props);

    let scoreData = [];
    let accuracyData = [];
    let dateData = [];
    for (let i = 0; i < props.data.length; i++) {
        scoreData.push(props.data[i].score);
        accuracyData.push(props.data[i].accuracy);
        dateData.push(props.data[i].createdAt);
    }

    console.log("scoreadata", scoreData);

    return (
        <Line
            data={{
                labels: dateData,

                datasets: [
                    {
                        label: "WPM",
                        data: scoreData,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                    {
                        label: "accuracy",
                        data: accuracyData,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                ],
            }}
        />
    );
}

export default Chart;
