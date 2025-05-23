import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DiffieHellmanPage from "./pages/DiffieHellmanPage";
import RsaPage from "./pages/RsaPage";
import ExchangePage from "./pages/ExchangePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100">
        <Navbar />
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DiffieHellmanPage />} />
            <Route path="/rsa" element={<RsaPage />} />
            <Route path="/exchange" element={<ExchangePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
