import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />
            <Game />
            <Leaderboard />
        </>
    );
}

export default Home;
