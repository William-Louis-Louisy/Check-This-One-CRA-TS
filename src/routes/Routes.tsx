import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Error404 from "../pages/Error404";
import UserLists from "../pages/UserLists";
import UserProfile from "../pages/UserProfile";
import ListEdition from "../pages/ListEdition";
import BrowseLists from "../pages/BrowseLists";
import MoviesSearch from "../pages/MoviesSearch";
import MovieDetails from "../pages/MovieDetails";
import YoutubeSearch from "../pages/YoutubeSearch";
import TvShowsSearch from "../pages/TvShowsSearch";
import TvShowDetails from "../pages/TvShowDetails";
import NavBar from "../components/Navigation/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PodcastsSearch from "../pages/PodcastsSearch";
import UserLikedLists from "../pages/UserLikedLists";

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
        <Route path="podcastsSearch" element={<PodcastsSearch />} />

        {/* AUTHENTICATION */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        {/* USER */}
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="userLists" element={<UserLists />} />
        <Route path="userLikedLists" element={<UserLikedLists />} />

        {/* CONTENT DETAILS */}
        <Route path="movieDetails/:movieId" element={<MovieDetails />} />
        <Route path="tvDetails/:tvShowId" element={<TvShowDetails />} />

        {/* LIST EDITION */}
        <Route path="listEdition/:listId" element={<ListEdition />} />

        {/* BROWSE LISTS */}
        <Route path="browseLists" element={<BrowseLists />} />
        <Route path="browseLists/:userId" element={<BrowseLists />} />
      </Routes>
    </BrowserRouter>
  );
}
