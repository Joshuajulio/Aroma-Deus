import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="bg-[#370A40] shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-5xl font-extrabold text-[#F9DC7C] imperial-script-regular">
            Aroma Deus
          </h1>
        </Link>
        <Link to="/login">
          <button className="bg-[#FEFAF6] text-[#405D72] font-bold py-3 px-6 rounded-md hover:bg-[#758694] hover:text-white">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
