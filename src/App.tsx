import PublicRoutes from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppProvider from "./contexts/AppContext";
import { UserProvider } from "./contexts/UserContext";
import TotheTopButton from "./components/Common/TotheTopButton";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <PublicRoutes />
        <ToastContainer />
        <TotheTopButton />
      </UserProvider>
    </AppProvider>
  );
}

export default App;
