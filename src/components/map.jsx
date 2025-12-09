import * as d3 from "d3";
import * as Geo from "../geo.json";
import { useRef, useEffect } from "react";

function Map({ launchpads }) {
    const width = 1000;
    const height = 650;
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
    };
    const containerRef = useRef(null);
    useEffect(() => {
        const container = d3.select(containerRef.current);
        container.select("svg").remove();
        const svg = container
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g");

        const projection = d3.geoMercator()
            .scale(90)
            .center([0, 20])
            .translate([width / 2 - margin.left, height / 2 - margin.top]);

        // карта
        g.selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", "black")
            .attr("stroke", "#686868ff")
            .style("opacity", 0.7);

        // площадки 
        g.selectAll("circle")
            .data(launchpads)
            .enter()
            .append("circle")
            .attr("class", "launchpad")
            .attr("id", d => `launchpad-${d.id}`)
            .attr("cx", d => projection([d.longitude, d.latitude])[0])
            .attr("cy", d => projection([d.longitude, d.latitude])[1])
            .attr("r", 5)
            .attr("fill", "red")
            .append("title")
            .text(d => d.name);

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

    }, [launchpads]); 

    return (
        <div className="mapContainer map" ref={containerRef}></div>
    );
}

export { Map };