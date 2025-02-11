import PropTypes from "prop-types";

function Searchbar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search perfumes..."
        className="w-full border rounded-lg py-3 px-4 text-lg bg-white text-[#405D72] focus:outline-none focus:ring-2 focus:ring-[#405D72]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default Searchbar;
