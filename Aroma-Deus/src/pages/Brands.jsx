import { phase2api } from "../helpers/http-client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import NavbarCMS from "../components/NavbarCMS";
import SidebarCMS from "../components/SidebarCMS";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await phase2api.get(`/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(response.data);
      setBrands(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch brands",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <NavbarCMS />
      <main className="bg-[#0B192C] min-h-screen w-screen">
        <div className="flex flex-col md:flex-row ">
          {/* Sidebar */}
          <SidebarCMS
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="flex-1 p-4 md:p-8 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col space-y-4">
                <div className="rounded-lg p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    List of Brands
                  </h2>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-4 px-6 text-left">No</th>
                            <th className="py-4 px-6 text-left">Brand</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                          {brands.map((brand) => (
                            <tr
                              key={brand.id}
                              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="py-4 px-6 text-left whitespace-nowrap">
                                {brand.id}
                              </td>
                              <td className="py-4 px-6 text-left font-medium">
                                {brand.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Brands;
