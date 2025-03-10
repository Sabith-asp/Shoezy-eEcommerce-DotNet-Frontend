import "./App.css";
import Routers from "./Routers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            marginTop: "80px",
          },
        }}
      />
      <Routers />
    </>
  );
}

export default App;
