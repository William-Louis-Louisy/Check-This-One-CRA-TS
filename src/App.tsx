import PublicRoutes from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppProvider from "./contexts/AppContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <PublicRoutes />
        <ToastContainer />
      </UserProvider>
    </AppProvider>
  );
}

export default App;
