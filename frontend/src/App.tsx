import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DiffieHellmanPage from "./pages/DiffieHellmanPage";
import RsaPage from "./pages/RsaPage";
import ExchangePage from "./pages/ExchangePage";
import RC4Page from "./pages/RC4ComplexPage";

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
            <Route path="/rc4" element={<RC4Page />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
