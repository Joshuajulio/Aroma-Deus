import PropTypes from "prop-types";

function Filter({
  categories,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-[#405D72]">Filters</h2>
      <div className="mb-4">
        <label className="block mb-2 text-[#758694]">Brand</label>
        <select
          className="w-full border border-[#758694] rounded py-2 px-3 text-[#405D72]"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option key="0" value="">
            All Brands
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          {/* Add more options here */}
        </select>
      </div>
      {/* <div className="mb-4">
        <label className="block mb-2 text-[#758694]">Price Range</label>
        <select className="w-full border border-[#758694] rounded py-2 px-3 text-[#405D72]">
          <option>All Price</option>
          <option>~Rp. 500,000</option>
          <option>Rp. 500,000 - Rp. 1.000.000</option>
          <option>Rp. 1.000,000 - Rp. 2.000.000</option>
          <option>Rp. 2.000,000 - Rp. 3.000.000</option>
          <option>Rp. 3.000,000 - Rp. 4.000.000</option>
          <option>Rp. 4.000,000 - Rp. 5.000.000</option>
          <option>Rp. 5.000.000~</option>
          {/* Add more options here */}
      {/* </select> */}
      {/* </div> */}
      <div>
        <label className="block mb-2 text-[#758694]">Sort By</label>
        <select
          className="w-full border border-[#758694] rounded py-2 px-3 text-[#405D72]"
          value={sort}
          onChange={(e) => setSort(e.target.value)}>
          <option key="ASC" value="ASC">
            Oldest First
          </option>
          <option key="DESC" value="DESC">
            Newest First
          </option>
        </select>
      </div>
    </div>
  );
}

Filter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default Filter;
