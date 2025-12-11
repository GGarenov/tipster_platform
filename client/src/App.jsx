import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/layout/Navbar/Navbar";
import Home from "./pages/home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="d-flex">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
