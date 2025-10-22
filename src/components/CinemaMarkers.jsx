import { useMemo } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../data/cinemas";
import { useMapContext } from "./Map/context";

const CinemaMarkers = () => {
  const { Marker } = useMapContext();
  const params = useParams();

  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;
      return allCinemas.filter((cinema) => {
        return (
          (franchiseId === "all-cinemas" || cinema.franchise === franchiseId) &&
          cinema.countryCode === countryCode
        );
      });
    }
    return allCinemas;
  }, [params]);

  const handleCinemaClick = (cinema) => {
    console.log("Cinema clicked:", cinema);
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

export default CinemaMarkers;
