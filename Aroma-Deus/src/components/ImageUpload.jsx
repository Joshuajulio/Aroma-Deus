import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { phase2api } from "../helpers/http-client";
import Swal from "sweetalert2";

import FormData from "form-data";

function ImageUpload({ showImageUpload, handleCloseUploadImage, perfumeId }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(null);
  }, [showImageUpload]);

  const uploadImage = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Is the image correct?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // console.log(perfumeId.id, image);
          const formData = new FormData();
          formData.append("image", image);
          // console.log(formData);
          const response = await phase2api.patch(
            `/products/${perfumeId}/imgUrl`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          handleCloseUploadImage();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Image uploaded successfully",
          });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to upload image",
          });
        }
      }
    });
  };

  return (
    <>
      {showImageUpload && (
        <div
          id="uploadImageModal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Upload New Perfume Image
              </h2>
              <button
                onClick={handleCloseUploadImage}
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
            <form className="space-y-4" onSubmit={uploadImage}>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="space-y-2">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected perfume"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-[#370A40] hover:text-[#4B0D59]">
                            Click to upload
                          </span>
                          or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#370A40] text-white py-2 px-4 rounded-lg hover:bg-[#4B0D59] font-semibold">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

ImageUpload.propTypes = {
  showImageUpload: PropTypes.bool.isRequired,
  handleCloseUploadImage: PropTypes.func.isRequired,
  perfumeId: PropTypes.number.isRequired,
};

export default ImageUpload;
