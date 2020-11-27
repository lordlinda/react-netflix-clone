import React, { useState, useEffect } from "react";
import requests from "./requests";
import axios from "./axios";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState({});
  const fetchData = async () => {
    await axios
      .get(requests.fetchNetflixOriginals)
      .then((res) => {
        setMovie(
          res.data.results[Math.floor(Math.random() * res.data.results.length)]
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My list</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
}

export default Banner;
