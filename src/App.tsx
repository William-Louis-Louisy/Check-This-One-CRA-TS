import { ToastProvider } from "react-toast-notifications";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <div className="App">
      <ToastProvider placement="top-right">
        <PublicRoutes />
      </ToastProvider>
    </div>
  );
}

export default App;
