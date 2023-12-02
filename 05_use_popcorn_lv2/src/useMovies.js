import { useEffect, useState } from "react";

const baseURI = "http://www.omdbapi.com/?&apikey=REDACTED";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          callback?.();
          setIsLoading(true);
          setError("");

          const res = await fetch(`${baseURI}&s=${query}`, controller.signal);

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          setError("");
        } catch (error) {
          // console.log(error.message);
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
      // Each time ther is a new key stroke, a re render occurs and the cleanup function gets called
      return function () {
        controller.abort();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );
  return { movies, isLoading, error };
}
