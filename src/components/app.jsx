import { LaunchList } from "./launchList";
import { Map } from "./map";
import { useEffect, useState } from "react";
import { SpaceX } from "../api/spacex";

function App() {
    const [launches, setLaunches] = useState([]);
    const [launchpads, setLaunchpads] = useState([]);
    const spacex = new SpaceX();

    useEffect(() => {
        Promise.all([spacex.launches(), spacex.launchpads()])
            .then(([launchesData, launchpadsData]) => {
                console.log(launchpadsData[0]);
                console.log(launchesData[0]);
                setLaunches(launchesData);
                setLaunchpads(launchpadsData);
            })
            .catch(err => console.error("Ошибка при загрузке данных:", err));
    }, []);

    return (
        <main className='main'>
            <LaunchList launches={launches} /> 
            <Map launchpads={launchpads} />
        </main>
    )
}

export { App };
