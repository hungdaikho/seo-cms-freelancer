import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styles from "./map_rank_tracker.module.scss";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const MapRankTracker = () => {
  const [rankData, setRankData] = React.useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Set your API key in env
  });

  React.useEffect(() => {
    const fetchRankData = async () => {
      const data = await fetch("/api/rank-data").then((res) => res.json());
      setRankData(data);
    };

    fetchRankData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Map Rank Tracker</h2>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {rankData.map((rank: any, index) => (
            <Marker key={index} position={{ lat: rank.lat, lng: rank.lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapRankTracker;
