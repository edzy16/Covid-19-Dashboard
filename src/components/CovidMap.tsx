import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CovidMap: React.FC = () => {
    const { data } = useSelector((state: RootState) => state.covid);

    // Calculate circle radius based on active cases
    const getCircleRadius = (activeCases: number) => {
        return Math.sqrt(activeCases) * 100; // Adjust multiplier as needed
    };

    // Get color based on active cases
    const getCircleColor = (activeCases: number) => {
        if (activeCases > 50000) return "#FF0000";
        if (activeCases > 10000) return "#FFA500";
        return "#FFFF00";
    };

    return (
        <MapContainer
            center={[20.5937, 78.9629]} // Center of India
            zoom={5}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.entries(data).map(([stateName, stateData]) => (
                <Circle
                    key={stateName}
                    center={stateData.coordinates}
                    radius={getCircleRadius(stateData.activeCases)}
                    pathOptions={{
                        color: getCircleColor(stateData.activeCases),
                        fillColor: getCircleColor(stateData.activeCases),
                        fillOpacity: 0.6,
                    }}
                >
                    <Popup>
                        <div>
                            <h3 className="font-bold">{stateName}</h3>
                            <p>
                                Active Cases:{" "}
                                {stateData.activeCases.toLocaleString()}
                            </p>
                            <p>
                                Total Cases:{" "}
                                {stateData.totalCases.toLocaleString()}
                            </p>
                            <p>
                                Recovered:{" "}
                                {stateData.recovered.toLocaleString()}
                            </p>
                            <p>Deaths: {stateData.deaths.toLocaleString()}</p>
                        </div>
                    </Popup>
                </Circle>
            ))}
        </MapContainer>
    );
};

export default CovidMap;
