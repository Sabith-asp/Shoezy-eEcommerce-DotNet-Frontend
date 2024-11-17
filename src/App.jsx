import "./App.css";
import Routers from "./Routers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            marginTop: "80px", // Adjust the margin-top as needed
          },
        }}
      />
      <Routers />
    </>
  );
}

export default App;
