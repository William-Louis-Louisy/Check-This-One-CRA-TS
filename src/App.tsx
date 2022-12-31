import { ToastContainer } from "react-toastify";
import AppProvider from "./contexts/AppContext";
import { UserProvider } from "./contexts/UserContext";
import PublicRoutes from "./routes/Routes";

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
