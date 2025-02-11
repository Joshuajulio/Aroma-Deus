import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { phase2api } from "../helpers/http-client";
import Swal from "sweetalert2";

import SubmitButton from "./Button.jsx";

function Form({
  showModal,
  handleCloseModal,
  categories,
  createNew,
  currentPerfume,
}) {
  const [perfume, setPerfume] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    categoryId: 0,
  });

  useEffect(() => {
    setPerfume(currentPerfume);
  }, [showModal, currentPerfume]);

  const addPerfume = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are all data correct?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // console.log(perfume, "<<< add");
          const response = await phase2api.post(
            `/products`,
            {
              name: perfume.name,
              description: perfume.description,
              price: parseInt(perfume.price),
              imgUrl: perfume.imgUrl,
              stock: parseInt(perfume.stock),
              categoryId: perfume.categoryId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          console.log(response.data);
          handleCloseModal();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Perfume added successfully",
          });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add perfume",
          });
        }
      }
    });
  };

  const editPerfume = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are all data correct?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // console.log(perfume, "<<< edit");
          const response = await phase2api.put(
            `/products/${currentPerfume.id}`,
            {
              name: perfume.name,
              description: perfume.description,
              price: parseInt(perfume.price),
              imgUrl: perfume.imgUrl,
              stock: parseInt(perfume.stock),
              categoryId: perfume.categoryId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          console.log(response.data);
          handleCloseModal();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Perfume edited successfully",
          });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to edit perfume",
          });
        }
      }
    });
  };

  return (
    <>
      {showModal && (
        <div
          id="addPerfumeModal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="sticky top-0 bg-white p-4 sm:p-6 md:p-8 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#370A40]">
                  {createNew
                    ? "Add New Perfume"
                    : `Edit Perfume : ${currentPerfume.name}`}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 hover:text-gray-800">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <form
                className="space-y-4"
                onSubmit={createNew ? addPerfume : editPerfume}>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#370A40]"
                    required
                    value={perfume.name}
                    onChange={(e) =>
                      setPerfume({
                        ...perfume,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#370A40]"
                    rows={4}
                    required
                    value={perfume.description}
                    onChange={(e) =>
                      setPerfume({
                        ...perfume,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#370A40]"
                    required
                    value={perfume.price}
                    onChange={(e) =>
                      setPerfume({
                        ...perfume,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Stock
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#370A40]"
                    required
                    value={perfume.stock}
                    onChange={(e) =>
                      setPerfume({
                        ...perfume,
                        stock: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image URL
                  </label>
                  <input
                    id="imgUrl"
                    name="imgUrl"
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#370A40]"
                    required
                    value={perfume.imgUrl}
                    onChange={(e) =>
                      setPerfume({
                        ...perfume,
                        imgUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Brand
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#370A40]"
                    required
                    onChange={(e) =>
                      setPerfume({
                        ...perfume,
                        categoryId: parseInt(e.target.value),
                      })
                    }>
                    <option value="">Select Brand</option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={perfume.categoryId === category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {createNew ? (
                  <SubmitButton
                    text="Create Perfume"
                    className="w-full bg-[#370A40] text-white py-2 px-4 rounded-lg hover:bg-[#4B0D59] font-semibold"
                  />
                ) : (
                  <SubmitButton
                    text="Update Perfume"
                    className="w-full bg-[#370A40] text-white py-2 px-4 rounded-lg hover:bg-[#4B0D59] font-semibold"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Form.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  createNew: PropTypes.bool.isRequired,
  currentPerfume: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
  }).isRequired,
};

export default Form;
