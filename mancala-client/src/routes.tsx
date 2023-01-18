import Loader from "./components/Loader/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/home/index"));
const Play = lazy(() => import("./pages/play/index"));
const Players = lazy(() => import("./pages/Players/index"));
const Computers = lazy(() => import("./pages/ComputerVsComputer/index"));

function Routers() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/player-vs-player" element={<Players />} />
          <Route path="/computer-vs-computer" element={<Computers />} />
          <Route path="*" element={<h1>ERROR</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routers;
