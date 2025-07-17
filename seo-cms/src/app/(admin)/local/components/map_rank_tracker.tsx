import React from "react";
import { Map, Marker } from "react-google-maps"; // Assuming you're using Google Maps
import styles from "./map_rank_tracker.module.scss";

const MapRankTracker = () => {
  const [rankData, setRankData] = React.useState([]);

  // Fetch rank data (this is just a placeholder, implement your data fetching logic)
  React.useEffect(() => {
    const fetchRankData = async () => {
      // Fetch your data here and update state
      const data = await fetch("/api/rank-data").then(res => res.json());
      setRankData(data);
    };

    fetchRankData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Map Rank Tracker</h2>
      <Map
        defaultZoom={10}
        defaultCenter={{ lat: -34.397, lng: 150.644 }} // Replace with your default coordinates
      >
        {rankData.map((rank, index) => (
          <Marker key={index} position={{ lat: rank.lat, lng: rank.lng }} />
        ))}
      </Map>
    </div>
  );
};

export default MapRankTracker;