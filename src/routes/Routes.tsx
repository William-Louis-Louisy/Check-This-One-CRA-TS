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
import ListDetails from "../pages/ListDetails";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AdminDashboard from "../pages/AdminDashboard";
import Notifications from "../pages/Notifications";
import ForgottenPassword from "../pages/ForgottenPassword";
import ResetPassword from "../pages/ResetPassword";
import AboutUs from "../pages/AboutUs";
import Footer from "../components/Navigation/Footer";
import ContactUs from "../pages/ContactUs";
import BingeBuddy from "../pages/BingeBuddy";
import ScrollToTop from "../components/Common/ScrollToTop";

export default function PublicRoutes() {
  const { user, authReady } = useContext(UserContext);

  // Avoid briefly presenting a private route as 404 before the cookie
  // session has been restored after a page reload.
  if (!authReady) return null;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <>
          {/* BASICS */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />

          {/* SEARCH */}
          <Route path="moviesSearch" element={<MoviesSearch />} />
          <Route path="showsSearch" element={<TvShowsSearch />} />
          <Route path="youtubeSearch" element={<YoutubeSearch />} />
          <Route path="podcastsSearch" element={<PodcastsSearch />} />
          <Route path="bingeBuddy" element={<BingeBuddy />} />

          {/* CONTENT DETAILS */}
          <Route path="movieDetails/:movieId" element={<MovieDetails />} />
          <Route path="tvDetails/:tvShowId" element={<TvShowDetails />} />

          {/* BROWSE LISTS */}
          <Route path="browseLists" element={<BrowseLists />} />
          <Route path="browseLists/:userId" element={<BrowseLists />} />
          <Route path="listDetails/:id" element={<ListDetails />} />

          {/* AUTHENTICATION */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgottenPassword" element={<ForgottenPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </>

        {/* --- PRIVATE ROUTES --- */}
        {user && user?.id !== 0 && (
          <>
            {/* USER */}
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="userLists" element={<UserLists />} />
            <Route path="userLikedLists" element={<UserLikedLists />} />

            {/* LIST EDITION */}
            <Route path="listEdition/:listId" element={<ListEdition />} />

            {/* USER NOTIFICATIONS */}
            <Route path="notifications/:id" element={<Notifications />} />
          </>
        )}

        {/* --- ADMIN ROUTES --- */}
        {user && user?.role === "admin" && (
          <>
            <Route path="adminDashboard" element={<AdminDashboard />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
