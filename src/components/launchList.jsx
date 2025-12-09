import * as d3 from "d3";

function LaunchList(props) {

    const handleMouseOver = (launch) => {
        const padCircle = d3.select(`#launchpad-${launch.launchpad}`);
        if (!padCircle.empty()) {
            padCircle.attr("r", 8).attr("fill", "yellow").raise();
        }
    }

    const handleMouseOut = (launch) => {
        const padCircle = d3.select(`#launchpad-${launch.launchpad}`);
        if (!padCircle.empty()) {
            padCircle.attr("r", 5).attr("fill", "red");
        }
    }

    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer">
                <ul>
                    {props.launches.map(launch => (
                        <li
                            key={launch.id}
                            onMouseOver={() => handleMouseOver(launch)}
                            onMouseOut={() => handleMouseOut(launch)}
                        >
                            {launch.name}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export { LaunchList };
