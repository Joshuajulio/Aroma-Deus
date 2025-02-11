import { Link, useNavigate } from "react-router";
import PropTypes from "prop-types";

function SidebarCMS({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <button
        className="md:hidden text-white p-2 bg-[#0B192C] mx-4 my-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-16 6h16"
          />
        </svg>
      </button>
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block bg-[#1D2D44] w-full md:w-72 md:min-h-screen transition-all duration-300 ease-in-out z-40`}>
        <div className="p-6">
          <div className="space-y-6">
            <Link to="/dashboard">
              <div className="flex items-center space-x-3 text-white hover:bg-[#2C4365] p-3 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-lg font-medium">Dashboard</span>
              </div>
            </Link>
            <Link to="/brands">
              <div className="flex items-center space-x-3 text-white hover:bg-[#2C4365] p-3 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="text-lg font-medium">Brand List</span>
              </div>
            </Link>
            <Link to="/addstaff">
              <div className="flex items-center space-x-3 text-white hover:bg-[#2C4365] p-3 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span className="text-lg font-medium">Add Staff</span>
              </div>
            </Link>

            <div
              onClick={handleLogout}
              className="flex items-center space-x-3 text-white hover:bg-[#2C4365] p-3 rounded-lg transition-colors cursor-pointer mt-12">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-lg font-medium">Logout</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
SidebarCMS.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default SidebarCMS;
