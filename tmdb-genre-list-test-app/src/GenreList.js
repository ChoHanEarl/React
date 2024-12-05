import React, { useState, useEffect } from "react";
import axios from "axios";

const GenreList = () => {
  const [genres, setGenres] = useState([]); // 장르 데이터
  const [movies, setMovies] = useState([]); // 선택된 장르의 영화 데이터
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // TMDb API 키
  const BASE_URL = "https://api.themoviedb.org/3";

  const instance = axios.create({
    baseURL : BASE_URL,
    params: {
        api_key: API_KEY,
        language: "ko-KR"
    },
  })

  // 장르 목록 가져오기
  const fetchGenres = async () => {
    try {
      const response = await instance.get(`${BASE_URL}/genre/movie/list`, {
      });
      setGenres(response.data.genres);
    } catch (error) {
      setError("장르 목록을 가져오는 중 문제가 발생했습니다.");
    }
  };

  // 선택된 장르의 영화 가져오기
  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await instance.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId, // 선택된 장르 ID
          language: "ko-KR",
          sort_by: "popularity.desc",
        },
      });
      setMovies(response.data.results); // 영화 데이터 저장
    } catch (error) {
      setError("영화를 가져오는 중 문제가 발생했습니다.");
    }
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = (genreId) => {
    fetchMoviesByGenre(genreId);
  };

  // 컴포넌트가 마운트될 때 장르 데이터 가져오기
  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
      <h2>영화 장르</h2>
      {error && <p>{error}</p>}
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleButtonClick(genre.id)} // 장르 ID 전달
          >
            {genre.name}
          </button>
        ))}
      </div>

      <h2>영화 목록</h2>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            /> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
