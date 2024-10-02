import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Net from "./pages/Net";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/net" element={<Net />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}
