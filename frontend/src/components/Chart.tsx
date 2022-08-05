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
import { Grid, Skeleton } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Chart(props: any) {
    console.log("props", props);

    let scoreData = [];
    let dateData = [];

    for (let i = 0; i < props.data.length; i++) {
        scoreData.push(props.data[i].score);
        dateData.push(props.data[i].createdAt);
    }

    console.log("scoreadata", scoreData);

    return (
        <>
            <Grid container justifyContent={"center"}>
                <Grid item xs={10} md={6} lg={4}>
                    {props.data ? (
                        <Line
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    xAxes: { display: false },
                                    yAxes: {},
                                },
                            }}
                            data={{
                                labels: dateData,

                                datasets: [
                                    {
                                        label: "WPM",
                                        data: scoreData,
                                        borderColor: "#2979ff",
                                        backgroundColor: "#5393ff",
                                    },
                                ],
                            }}
                        />
                    ) : (
                        <Skeleton variant="rectangular" height={250} />
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default Chart;
