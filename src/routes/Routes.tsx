import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import MoviesSearch from "../pages/MoviesSearch";
import YoutubeSearch from "../pages/YoutubeSearch";
import NavBar from "../components/Navigation/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TvShowsSearch from "../pages/TvShowsSearch";

export default function PublicRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        <Route path="moviesSearch" element={<MoviesSearch />} />
        <Route path="showsSearch" element={<TvShowsSearch />} />
        <Route path="youtubeSearch" element={<YoutubeSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
