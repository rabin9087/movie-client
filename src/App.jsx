import { useEffect, useState } from "react";
import api from "../src/api/axiosConfig";
import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/movies");
      setMovies(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
      console.log(singleMovie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Layout />}></Route> */}
        <Route path="/" element={<Home movies={movies} />}></Route>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
        <Route
          path="/Reviews/:movieId"
          element={
            <Reviews
              getMovieData={getMovieData}
              movie={movie}
              setReviews={setReviews}
              reviews={reviews}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
