import { phase2api } from "../helpers/http-client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import NavbarCMS from "../components/NavbarCMS";
import Form from "../components/Form";
import ImageUpload from "../components/ImageUpload";
import SidebarCMS from "../components/SidebarCMS";

function Dashboard() {
  const [perfumes, setPerfumes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [createNew, setCreateNew] = useState(true);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [perfumeId, setPerfumeId] = useState(0);
  const [user, setUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getUser = () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const decodedToken = atob(token.split(".")[1]);
        // console.log(JSON.parse(decodedToken));
        setUser(JSON.parse(decodedToken));
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch user",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchPerfumes = async () => {
    try {
      const response = await phase2api.get(`/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setPerfumes(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch perfumes",
      });
    }
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await phase2api.get(`/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch categories",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (
    createNew,
    perfumeData = {
      id: 0,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      imgUrl: "",
      categoryId: 0,
      userId: 0,
    }
  ) => {
    setCreateNew(createNew);
    localStorage.setItem("currentPerfume", JSON.stringify(perfumeData));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchPerfumes();
  };

  const deletePerfume = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await phase2api.delete(`/products/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          fetchPerfumes();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting perfume:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete perfume",
          });
        }
      }
    });
  };

  const handleOpenUploadImage = (id) => {
    setPerfumeId(id);
    setShowImageUpload(true);
  };

  const handleCloseUploadImage = () => {
    setShowImageUpload(false);
    fetchPerfumes();
  };

  return (
    <>
      <NavbarCMS />
      <Form
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        categories={categories}
        createNew={createNew}
        currentPerfume={JSON.parse(localStorage.getItem("currentPerfume"))}
      />
      <ImageUpload
        showImageUpload={showImageUpload}
        handleCloseUploadImage={handleCloseUploadImage}
        perfumeId={perfumeId}
      />

      <main className="bg-[#0B192C] min-h-screen w-screen">
        <div className="flex flex-col md:flex-row ">
          {/* Sidebar */}
          <SidebarCMS
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">
                Perfume List
              </h2>
              <button
                onClick={() => handleOpenModal(true)}
                className="bg-white text-[#370A40] px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-[#f0d16b] font-semibold text-sm md:text-base">
                Add Perfume
              </button>
            </div>
            <div className="bg-white rounded shadow overflow-x-auto">
              <div className="min-w-full">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">No</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="hidden md:table-cell py-3 px-6 text-left">
                        Description
                      </th>
                      <th className="hidden md:table-cell py-3 px-6 text-left">
                        Price
                      </th>
                      <th className="hidden md:table-cell py-3 px-6 text-left">
                        Stock
                      </th>
                      <th className="py-3 px-6 text-left">Image</th>
                      <th className="hidden md:table-cell py-3 px-6 text-left">
                        Brand
                      </th>
                      <th className="hidden md:table-cell py-3 px-6 text-left">
                        Author
                      </th>
                      <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {perfumes.map((perfume) => (
                      <tr
                        key={perfume.id}
                        className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-2 px-4 text-left whitespace-nowrap">
                          {perfume.id}
                        </td>
                        <td className="py-2 px-4 text-left font-bold align-middle">
                          <div className="h-12 w-40 sm:w-30 py-2 px-4 text-left break-words">
                            {perfume.name}
                          </div>
                        </td>
                        <td className="hidden md:table-cell py-3 px-6 text-left whitespace-pre-line">
                          <div className="h-20 w-80 overflow-y-auto">
                            {perfume.description}
                          </div>
                        </td>
                        <td className="hidden md:table-cell py-3 px-6 text-left">
                          Rp.{" "}
                          {perfume.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </td>
                        <td className="hidden md:table-cell py-3 px-6 text-left">
                          {perfume.stock}
                        </td>
                        <td className="py-3 px-6 text-left">
                          <img
                            src={perfume.imgUrl}
                            alt={perfume.name}
                            className="h-12 w-12 sm:h-20 sm:w-20 rounded cursor-pointer"
                            onClick={() =>
                              handleOpenUploadImage(parseInt(perfume.id))
                            }
                          />
                        </td>
                        <td className="hidden md:table-cell py-3 px-6 text-left">
                          {perfume.Category.name}
                        </td>
                        <td className="hidden md:table-cell py-3 px-6 text-left">
                          {perfume.User.username}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {(perfume.authorId === user.id || user.id === 1) && (
                            <>
                              <button
                                onClick={() =>
                                  handleOpenModal(false, {
                                    id: perfume.id,
                                    name: perfume.name,
                                    description: perfume.description,
                                    price: perfume.price,
                                    stock: perfume.stock,
                                    imgUrl: perfume.imgUrl,
                                    categoryId: perfume.categoryId,
                                    authorId: perfume.authorId,
                                  })
                                }
                                className="text-blue-600 hover:text-blue-900 mr-2">
                                <i className="fas fa-edit" />
                                Edit
                              </button>
                              <button
                                onClick={() => deletePerfume(perfume.id)}
                                className="text-red-600 hover:text-red-900">
                                <i className="fas fa-trash-alt" />
                                Delete
                              </button>
                            </>
                          )}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}
export default Dashboard;
