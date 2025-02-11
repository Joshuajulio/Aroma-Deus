import "./Card.css";
import PropTypes from "prop-types";

function Card({ perfume }) {
  return (
    <div className="bg-white rounded-lg shadow-md card">
      <img src={perfume.imgUrl} alt={perfume.name} className="object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#2D3748]">{perfume.name}</h2>
        <p className="text-[#758694]">{perfume.Category.name}</p>
        <p className="text-[#405D72] font-semibold">
          Rp. {perfume.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  perfume: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    Category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
