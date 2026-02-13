import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import NavBar from "../components/layout/navbar";

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
