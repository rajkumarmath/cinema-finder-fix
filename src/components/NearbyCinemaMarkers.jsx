import useNearbyCinemas from "../data/nearbyCinemas";
import { useMapContext } from "./Map/context";

const NearbyCinemaMarkers = () => {
  const { Marker } = useMapContext();
  const { cinemas } = useNearbyCinemas();

  const handleCinemaClick = (cinema) => {
    console.log("Nearby cinema clicked:", cinema);
    // Dispatch custom event to snap map to cinema location
    window.dispatchEvent(
      new CustomEvent("map.snapTo", {
        detail: { lat: cinema.lat, lng: cinema.lng },
      })
    );

    // Dispatch new event to show cinema information
    window.dispatchEvent(
      new CustomEvent("cinema.selected", {
        detail: cinema,
      })
    );
  };

  return cinemas.map((cinema, idx) => {
    const MarkerComponent = Marker;
    return (
      <MarkerComponent
        lat={cinema.lat}
        lon={cinema.lng}
        key={idx}
        onClick={() => handleCinemaClick(cinema)}
      />
    );
  });
};

export default NearbyCinemaMarkers;
