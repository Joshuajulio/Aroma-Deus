import { Link } from "react-router";

function NavbarCMS() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#F9DC7C] font-['Ephesis']">
              Perfumery
            </h1>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-[#370A40] text-center">
            Content Management Service
          </h1>
          <div className="hidden md:block"></div>
        </div>
      </div>
    </nav>
  );
}
export default NavbarCMS;
