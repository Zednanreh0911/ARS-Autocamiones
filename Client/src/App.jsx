import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-10">

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/vehiculos/new" element={<NewPage />}></Route>
          <Route path="/vehiculos/:id" element={<NewPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
