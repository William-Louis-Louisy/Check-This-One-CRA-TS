import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/Navigation/NavBar";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";

function PublicRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PublicRoutes;
