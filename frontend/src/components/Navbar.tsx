import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    classNames("px-4 py-2 rounded-md transition-colors", {
      "bg-indigo-600 text-white": location.pathname === path,
      "text-gray-700 hover:bg-gray-200": location.pathname !== path,
    });

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <h1 className="text-xl font-bold text-indigo-600">🔐 Cryptology App</h1>
      <div className="space-x-4">
        <Link to="/" className={linkClass("/")}>
          Diffie-Hellman
        </Link>
        <Link to="/rsa" className={linkClass("/rsa")}>
          RSA
        </Link>
        <Link to="/exchange" className={linkClass("/exchange")}>
          Key Exchange
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
