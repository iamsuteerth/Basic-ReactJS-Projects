import { useState } from "react";

function useGeolocation() {
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return { position, error, isLoading, getPosition };
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
    return { position, error, isLoading, getPosition };
  }
}

export default function App() {
  // const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(0);
  const {
    position: { lat, lng },
    error,
    isLoading,
    getPosition,
  } = useGeolocation();
  // const [position, setPosition] = useState({});
  // const [error, setError] = useState(null);

  // const { lat, lng } = position;

  function handleClicks() {
    setCountClicks((count) => count + 1);
    getPosition();
  }
  // function getPosition() {
  //   // setCountClicks((count) => count + 1);

  //   // if (!navigator.geolocation)
  //   //   return setError("Your browser does not support geolocation");

  //   // setIsLoading(true);
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       setPosition({
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //       });
  //       setIsLoading(false);
  //     },
  //     (error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     },
  //   );
  // }

  return (
    <div>
      <button onClick={handleClicks} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
