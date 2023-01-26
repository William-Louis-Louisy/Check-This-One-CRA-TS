import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Error404 from "../pages/Error404";
import UserProfile from "../pages/UserProfile";
import MoviesSearch from "../pages/MoviesSearch";
import YoutubeSearch from "../pages/YoutubeSearch";
import TvShowsSearch from "../pages/TvShowsSearch";
import NavBar from "../components/Navigation/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLists from "../pages/UserLists";
import MovieDetails from "../pages/MovieDetails";
import TvShowDetails from "../pages/TvShowDetails";

export default function PublicRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        {/* SEARCH */}
        <Route path="moviesSearch" element={<MoviesSearch />} />
        <Route path="showsSearch" element={<TvShowsSearch />} />
        <Route path="youtubeSearch" element={<YoutubeSearch />} />

        {/* AUTHENTICATION */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        {/* USER */}
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="userLists" element={<UserLists />} />

        {/* CONTENT DETAILS */}
        <Route path="movieDetails/:movieId" element={<MovieDetails />} />
        <Route path="tvDetails/:tvShowId" element={<TvShowDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
