import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { phase2api } from "../helpers/http-client";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Detail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState({
    name: "",
    description: "",
    imgUrl: "",
    price: "",
    stock: "",
    Category: { name: "" },
  });
  useEffect(() => {
    const fetchPerfumeById = async () => {
      try {
        const response = await phase2api.get(`/pub/products/${id}`);
        console.log(response.data);
        setPerfume(response.data);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch perfume",
        });
      }
    };

    fetchPerfumeById();
  }, [id]);
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-0 pb-8 min-h-[870px]">
        <div className="container mx-auto py-4">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 text-[#405d72] hover:bg-[#758694] hover:text-white border border-[#405d72] shadow-md rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return to Home
            </button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={perfume.imgUrl}
              alt={perfume.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Product Details */}
          <div className="md:w-1/2 md:pl-8 text-lg">
            <h2 className="text-3xl font-bold mb-2">{perfume.name}</h2>
            <p className="text-xl text-[#758694] mb-4">
              {perfume.Category.name}
            </p>
            <p className="text-2xl text-[#405d72] font-semibold mb-4">
              Price: Rp.{" "}
              {perfume.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <p className="mb-4">Stock: {perfume.stock} available</p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p
                className="whitespace-pre-line"
                style={{
                  backgroundColor: "#F7E7DC",
                  padding: "1rem",
                  borderRadius: "0.375rem",
                }}>
                {perfume.description}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Detail;
